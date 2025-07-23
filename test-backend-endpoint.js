// Test script for the simplified onboarding endpoint
// Run with: node test-backend-endpoint.js

import https from 'https';

function testEndpoint(intent, language) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ intent, language });
    
    const options = {
      hostname: 'v3-production-2670.up.railway.app',
      port: 443,
      path: '/onboarding/start',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: response
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: body
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Andes Simplified Onboarding Endpoint\n');
  console.log('🔍 DEBUGGING PREMIUM BUTTON ISSUE\n');

  const tests = [
    { intent: 'premium', language: 'es' }, // Test premium first
    { intent: 'free', language: 'es' },
    { intent: 'premium', language: 'en' },
    { intent: 'free', language: 'en' }
  ];

  for (const test of tests) {
    try {
      console.log(`Testing ${test.intent} (${test.language})...`);
      const result = await testEndpoint(test.intent, test.language);
      
      if (result.status === 200 && result.data.success) {
        console.log('✅ SUCCESS');
        console.log(`   WhatsApp Link: ${result.data.whatsappLink.substring(0, 80)}...`);
        console.log(`   Message: ${result.data.message}`);
      } else {
        console.log('❌ FAILED');
        console.log(`   Status: ${result.status}`);
        console.log(`   Response: ${JSON.stringify(result.data, null, 2)}`);
      }
    } catch (error) {
      console.log('❌ ERROR');
      console.log(`   ${error.message}`);
    }
    console.log('');
  }

  // Test health endpoint
  console.log('Testing health endpoint...');
  try {
    const healthResult = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'v3-production-2670.up.railway.app',
        port: 443,
        path: '/onboarding/health',
        method: 'GET'
      }, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        });
      });
      req.on('error', reject);
      req.end();
    });

    if (healthResult.status === 200) {
      console.log('✅ Health check passed');
      console.log(`   Status: ${healthResult.data.status}`);
      console.log(`   Service: ${healthResult.data.service}`);
    } else {
      console.log('❌ Health check failed');
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
  }
}

runTests();
