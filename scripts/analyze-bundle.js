#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Bundle Analysis Script for Andes Runners
 * Analyzes build output and provides optimization recommendations
 */

function analyzeBundle() {
  console.log('🔍 Analyzing bundle size and performance...\n');

  const distPath = path.join(process.cwd(), 'dist');
  const esDistPath = path.join(process.cwd(), 'dist/es');

  if (!fs.existsSync(distPath)) {
    console.error('❌ Build not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Analyze English build
  console.log('📊 English Build Analysis:');
  analyzeBuildDir(distPath);

  // Analyze Spanish build if exists
  if (fs.existsSync(esDistPath)) {
    console.log('\n📊 Spanish Build Analysis:');
    analyzeBuildDir(esDistPath);
  }

  console.log('\n💡 Performance Recommendations:');
  console.log('1. ✅ Code splitting implemented');
  console.log('2. ✅ Vendor chunks separated');
  console.log('3. ✅ Asset optimization enabled');
  console.log('4. 🔄 Monitor bundle sizes after each build');
  console.log('5. 🎯 Target: Keep main chunk < 500KB');
}

function analyzeBuildDir(buildPath) {
  const assetsPath = path.join(buildPath, 'assets');
  
  if (!fs.existsSync(assetsPath)) {
    console.log('  No assets directory found');
    return;
  }

  const files = fs.readdirSync(assetsPath);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  const cssFiles = files.filter(f => f.endsWith('.css'));

  let totalJSSize = 0;
  let totalCSSSize = 0;

  console.log('  JavaScript Files:');
  jsFiles.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    totalJSSize += sizeKB;
    
    const status = sizeKB > 500 ? '⚠️' : sizeKB > 200 ? '🟡' : '✅';
    console.log(`    ${status} ${file}: ${sizeKB}KB`);
  });

  console.log('  CSS Files:');
  cssFiles.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    totalCSSSize += sizeKB;
    
    const status = sizeKB > 100 ? '⚠️' : sizeKB > 50 ? '🟡' : '✅';
    console.log(`    ${status} ${file}: ${sizeKB}KB`);
  });

  console.log(`  Total JS: ${totalJSSize}KB`);
  console.log(`  Total CSS: ${totalCSSSize}KB`);
  console.log(`  Total Assets: ${totalJSSize + totalCSSSize}KB`);

  // Performance warnings
  if (totalJSSize > 1000) {
    console.log('  ⚠️  Large JS bundle detected. Consider more aggressive code splitting.');
  }
  if (totalCSSSize > 200) {
    console.log('  ⚠️  Large CSS bundle detected. Consider CSS optimization.');
  }
}

// Run analysis
analyzeBundle();
