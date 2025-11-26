const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 画像最適化の設定
const IMAGE_DIR = path.join(__dirname, '../public/images');
const MAX_FILE_SIZE = 500 * 1024; // 500KB
const QUALITY = 85;

// サポートされている画像形式
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.webp'];

// ファイルサイズを取得
function getFileSize(filePath) {
  return fs.statSync(filePath).size;
}

// 画像を最適化
function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileSize = getFileSize(filePath);
  
  if (fileSize <= MAX_FILE_SIZE) {
    console.log(`✅ ${path.basename(filePath)}: ${(fileSize / 1024).toFixed(1)}KB (最適化不要)`);
    return;
  }

  try {
    let outputPath = filePath;
    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      // PNG/JPGをWebPに変換
      outputPath = filePath.replace(ext, '.webp');
      
      if (ext === '.png') {
        execSync(`cwebp -q ${QUALITY} "${filePath}" -o "${outputPath}"`, { stdio: 'inherit' });
      } else {
        execSync(`cwebp -q ${QUALITY} "${filePath}" -o "${outputPath}"`, { stdio: 'inherit' });
      }
      
      // 元のファイルを削除
      fs.unlinkSync(filePath);
      console.log(`🔄 ${path.basename(filePath)} → ${path.basename(outputPath)}: ${(getFileSize(outputPath) / 1024).toFixed(1)}KB`);
    } else if (ext === '.webp') {
      // WebPを再圧縮
      const tempPath = filePath.replace('.webp', '_temp.webp');
      execSync(`cwebp -q ${QUALITY} "${filePath}" -o "${tempPath}"`, { stdio: 'inherit' });
      
      if (getFileSize(tempPath) < fileSize) {
        fs.renameSync(tempPath, filePath);
        console.log(`🔄 ${path.basename(filePath)}: ${(getFileSize(filePath) / 1024).toFixed(1)}KB (再圧縮)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`✅ ${path.basename(filePath)}: ${(fileSize / 1024).toFixed(1)}KB (最適化済み)`);
      }
    }
  } catch (error) {
    console.error(`❌ エラー: ${filePath}`, error.message);
  }
}

// ディレクトリを再帰的に処理
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      processDirectory(itemPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        optimizeImage(itemPath);
      }
    }
  }
}

// メイン処理
console.log('🚀 画像最適化を開始します...');
console.log(`📁 対象ディレクトリ: ${IMAGE_DIR}`);
console.log(`📏 最大ファイルサイズ: ${MAX_FILE_SIZE / 1024}KB`);
console.log(`🎨 品質設定: ${QUALITY}%\n`);

// cwebpがインストールされているかチェック
try {
  execSync('cwebp -version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ cwebpがインストールされていません。');
  console.error('インストール方法: brew install webp');
  process.exit(1);
}

processDirectory(IMAGE_DIR);
console.log('\n✅ 画像最適化が完了しました！');
