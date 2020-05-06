const fs = require('fs')
const { exec }  = require('child_process') // 创建子进程的方法
// 其中最原始的创建方法是spawn,exec,execFile,fork都是对spawan不同程度的封装

// exec的实现原理是启动了一个系统shell来解析参数，通俗解释，用cmd来运行一段命令？它还有一个回调函数
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


readFile('src', function(dir) {
  var ls = exec(`stylus -w ${dir.replace('styl', './styl')} -o ${dir.replace('src', 'dist').replace('styl', './css')}`, (err, stdout, stderr) => {
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
    console.log(`子进程退出: ${code}`);
  })
})