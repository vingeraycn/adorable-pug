const fs = require('fs')
const { exec }  = require('child_process') // 创建子进程的方法

function readFile(dir, callback) {
  callback(dir);
  fs.readdir(dir, (err, files) => {
    if (files && files.length) {
      files.forEach(file => {
        var arr = file.split('.');
        arr.pop();
        var path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
          readFile(path, callback);
        }
      })
    }
  })
}

process.env.NODE_ENV || (process.env.NODE_ENV = 'production')
var isDev = process.env.NODE_ENV === 'development';
var isProd = process.env.NODE_ENV === 'production'

readFile('src', function(dir) {
  var ls = exec(`stylus ${isDev ? '-w' : ''} ${dir.replace('.styl', './styl')} -o ${dir.replace('src', 'dist').replace('.styl', './css')}`, (err, stdout, stderr) => {
    if (err) {
      console.log(`error: ${err}`);
    }
  })
  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  })
  ls.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  })
  ls.on("close", (code) => {
    // 0 就不要报了
    code && console.log(`子进程退出: ${code}`);
  })
})