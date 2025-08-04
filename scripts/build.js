#!/usr/bin/env node

/**
 * Robust build script for Netlify deployment
 * Ensures Vite is available and handles both EN and ES builds
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const log = (message) => {
  console.log(`🚀 [BUILD] ${message}`);
};

const error = (message) => {
  console.error(`❌ [ERROR] ${message}`);
  process.exit(1);
};

const runCommand = (command, description) => {
  log(description);
  try {
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    log(`✅ ${description} completed successfully`);
  } catch (err) {
    error(`Failed to ${description.toLowerCase()}: ${err.message}`);
  }
};

const main = () => {
  log('Starting Andes Runners build process...');

  // Check if we're in the right directory
  if (!existsSync('package.json')) {
    error('package.json not found. Make sure you\'re in the project root.');
  }

  // Check if node_modules exists
  if (!existsSync('node_modules')) {
    error('node_modules not found. Run npm install first.');
  }

  // Check if Vite is available
  const vitePath = path.join('node_modules', '.bin', 'vite');
  if (!existsSync(vitePath)) {
    log('Vite not found in node_modules/.bin, checking if it\'s globally available...');
    try {
      execSync('npx vite --version', { stdio: 'pipe' });
      log('✅ Vite is available via npx');
    } catch (err) {
      error('Vite is not available. Make sure it\'s installed as a devDependency.');
    }
  }

  // Run TypeScript check
  runCommand('npx tsc --project tsconfig.build.json --noEmit', 'TypeScript type checking');

  // Build English version
  runCommand('npx vite build', 'Building English version');

  // Build Spanish version
  runCommand('VITE_APP_LANG=es npx vite build', 'Building Spanish version');

  log('🎉 Build completed successfully!');
  log('📦 Both English and Spanish versions built');
  log('🚀 Ready for deployment to Netlify');
};

// Run the build
main();
