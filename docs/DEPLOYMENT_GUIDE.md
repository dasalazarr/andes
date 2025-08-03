# 🚀 Andes Runners - Deployment & DevOps Guide

## 📋 **Deployment Overview**

This document outlines the deployment strategy, infrastructure setup, and DevOps practices for the Andes Runners platform transformation.

---

## 🏗️ **Infrastructure Architecture**

### **Production Environment**
```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE CDN                           │
├─────────────────────────────────────────────────────────────────┤
│  Global Edge Locations  │  DDoS Protection  │  SSL/TLS         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LOAD BALANCER                              │
├─────────────────────────────────────────────────────────────────┤
│  AWS ALB / Google Cloud LB  │  Health Checks  │  Auto Scaling   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   KUBERNETES CLUSTER                            │
├─────────────────────────────────────────────────────────────────┤
│  Frontend Pods  │  Backend Pods  │  Worker Pods  │  Monitoring  │
│  (React App)    │  (Node.js API) │  (Background) │  (Prometheus) │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL     │  Redis Cache   │  File Storage │  Monitoring  │
│  (RDS/Cloud SQL)│  (ElastiCache) │  (S3/GCS)     │  (DataDog)   │
└─────────────────────────────────────────────────────────────────┘
```

### **Environment Strategy**
```
Development → Staging → Production
     ↓           ↓         ↓
   Local      Preview   Live Site
   Testing    QA/UAT    Users
```

---

## 🐳 **Containerization Strategy**

### **Frontend Dockerfile**
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Backend Dockerfile**
```dockerfile
# Backend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### **Docker Compose (Development)**
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:3001
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/andes_dev
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-key
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=andes_dev
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## ☸️ **Kubernetes Deployment**

### **Frontend Deployment**
```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: andes-frontend
  labels:
    app: andes-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: andes-frontend
  template:
    metadata:
      labels:
        app: andes-frontend
    spec:
      containers:
      - name: frontend
        image: andes/frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: andes-frontend-service
spec:
  selector:
    app: andes-frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

### **Backend Deployment**
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: andes-backend
  labels:
    app: andes-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: andes-backend
  template:
    metadata:
      labels:
        app: andes-backend
    spec:
      containers:
      - name: backend
        image: andes/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: andes-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: andes-secrets
              key: jwt-secret
        - name: STRIPE_SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: andes-secrets
              key: stripe-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: andes-backend-service
spec:
  selector:
    app: andes-backend
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: ClusterIP
```

### **Ingress Configuration**
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: andes-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
  - hosts:
    - andesrunners.com
    - www.andesrunners.com
    secretName: andes-tls
  rules:
  - host: andesrunners.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: andes-backend-service
            port:
              number: 3000
      - path: /
        pathType: Prefix
        backend:
          service:
            name: andes-frontend-service
            port:
              number: 80
  - host: www.andesrunners.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: andes-frontend-service
            port:
              number: 80
```

---

## 🔄 **CI/CD Pipeline**

### **GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: |
          npm run test:unit
          npm run test:integration
          npm run test:e2e
      
      - name: Check code coverage
        run: npm run test:coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push Frontend image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./Dockerfile.frontend
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:${{ github.sha }}
      
      - name: Build and push Backend image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./Dockerfile.backend
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure kubectl
        uses: azure/k8s-set-context@v1
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
      
      - name: Deploy to Kubernetes
        run: |
          # Update image tags in deployment files
          sed -i 's|image: andes/frontend:latest|image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:${{ github.sha }}|' k8s/frontend-deployment.yaml
          sed -i 's|image: andes/backend:latest|image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:${{ github.sha }}|' k8s/backend-deployment.yaml
          
          # Apply deployments
          kubectl apply -f k8s/
          
          # Wait for rollout to complete
          kubectl rollout status deployment/andes-frontend
          kubectl rollout status deployment/andes-backend
      
      - name: Run smoke tests
        run: |
          # Wait for services to be ready
          sleep 30
          
          # Run basic health checks
          curl -f https://andesrunners.com/health || exit 1
          curl -f https://andesrunners.com/api/health || exit 1
```

### **Deployment Environments**
```yaml
# environments/staging.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: andes-staging

---
# Staging-specific configurations
apiVersion: apps/v1
kind: Deployment
metadata:
  name: andes-frontend
  namespace: andes-staging
spec:
  replicas: 1  # Reduced for staging
  template:
    spec:
      containers:
      - name: frontend
        image: andes/frontend:staging
        env:
        - name: VITE_API_URL
          value: "https://staging-api.andesrunners.com"
        - name: VITE_ENVIRONMENT
          value: "staging"
```

---

## 📊 **Monitoring & Observability**

### **Prometheus Configuration**
```yaml
# monitoring/prometheus.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    
    scrape_configs:
    - job_name: 'andes-frontend'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        action: keep
        regex: andes-frontend
    
    - job_name: 'andes-backend'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        action: keep
        regex: andes-backend
    
    - job_name: 'postgres-exporter'
      static_configs:
      - targets: ['postgres-exporter:9187']
```

### **Grafana Dashboards**
```json
{
  "dashboard": {
    "title": "Andes Runners - Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{status}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
            "legendFormat": "Error Rate"
          }
        ]
      }
    ]
  }
}
```

### **Alerting Rules**
```yaml
# monitoring/alerts.yaml
groups:
- name: andes-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} errors per second"
  
  - alert: HighResponseTime
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High response time detected"
      description: "95th percentile response time is {{ $value }} seconds"
  
  - alert: DatabaseConnectionsHigh
    expr: pg_stat_activity_count > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High database connection count"
      description: "Database has {{ $value }} active connections"
```

---

## 🔒 **Security & Compliance**

### **Security Scanning Pipeline**
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run npm audit
        run: npm audit --audit-level high
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  
  container-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build image
        run: docker build -t andes/backend:test .
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'andes/backend:test'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
```

### **Network Policies**
```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: andes-network-policy
spec:
  podSelector:
    matchLabels:
      app: andes-backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: andes-frontend
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
```

---

## 📈 **Scaling Strategy**

### **Horizontal Pod Autoscaler**
```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: andes-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: andes-backend
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
```

---

*This deployment guide ensures reliable, scalable, and secure delivery of the Andes Runners platform with comprehensive monitoring and automated operations.*
