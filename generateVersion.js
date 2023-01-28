const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const dirs = {
  pc: 'pc',
  mobile: 'mobile',
};
const distPath = path.resolve(__dirname, './dist');
const program = new Command();
program.option('-v, --version <type>', 'specify  version').option('-p, --platform <type>', 'specify platform, option: pc,mobole');

program.parse();

const options = program.opts();
console.log(options)

/****改这里********/
// const params = process.argv;
// if (!params || params.length === 0) return;
// const folder = params[0]; // 'pc' | 'mobile'
// const version = '1.13.0'; // 版本
const version = options.version; // 版本
// const targetDir = path.resolve(distPath, dirs.pc); // 目录
const targetDir = path.resolve(distPath, options.platform); // 目录
/****改这里********/


global.versionOptions = options;

global.versionOptions.relativePath = './dist/' + options.platform

function generateVersion() {
    const list = fs.readdirSync(distPath);
    console.log(list);

    mkdirIgnoreExists(targetDir);

    for (let i = 0; i < list.length; i++) {
        const fileName = list[i];
        const filePath = path.resolve(distPath, fileName);
        if (!fs.statSync(filePath).isDirectory()) {
          if (filePath.endsWith('.html')) {
            reWriteHtml(filePath, options.platform, version);
          }
          const versionFileName = processFileName(fileName);
          moveFile(filePath, path.resolve(targetDir, versionFileName), version);
    
        }
    }
}
generateVersion()
function processFileName(fileName) {
    const nameArr = fileName.split('.');
    const fre_name = nameArr.shift();
    nameArr.unshift(fre_name + '_' + version);
    const versionFileName = nameArr.join('.');
    return versionFileName;
}

function moveFile(sourceFile, destPath, version) {
  console.log(sourceFile, destPath);
  if (sourceFile.endsWith('.map')) {
    destPath = destPath.replace(`_${version}`, '');
  }
  fs.rename(sourceFile, destPath, function (err) {
    if (err) throw err;
    fs.stat(destPath, function (err, stats) {
      if (err) throw err;
      console.log('stats: ' + JSON.stringify(stats));
    });
  });
}

function mkdirIgnoreExists(targetDir) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }
}
function reWriteHtml(filePath, platform, version) {
  let data = fs.readFileSync(filePath).toString();
  data = data.replace(
    '//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/vendor.',
    `//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/${platform}/vendor_${version}.`
  );
  data = data.replace(
    '//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/vendor.',
    `//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/${platform}/vendor_${version}.`
  );
  data = data.replace(
    '//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/index.',
    `//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/${platform}/index_${version}.`
  );
  data = data.replace(
    '//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/index.',
    `//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1/${platform}/index_${version}.`
  );
  fs.writeFileSync(filePath, data);
}

// function mkdirRmExists(targetDir) {
//   if (fs.existsSync(targetDir)) {
//     fs.rmdirSync(targetDir);
//   }
//   fs.mkdirSync(targetDir);
// }

module.exports = {
    generateVersion
}