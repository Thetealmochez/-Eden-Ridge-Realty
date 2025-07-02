
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...');

try {
  // Run the Vite build
  console.log('📦 Building with Vite...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Check if dist directory was created
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    console.log('✅ Build completed successfully!');
    console.log('📁 Build output directory: dist/');
    
    // List contents of dist directory
    const files = fs.readdirSync(distPath);
    console.log('📋 Build artifacts:');
    files.forEach(file => {
      console.log(`   - ${file}`);
    });
  } else {
    console.error('❌ Build failed: dist directory not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
