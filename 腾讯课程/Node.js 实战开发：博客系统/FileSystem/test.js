var fs = require('fs');

// fs.open('1.txt', 'r', function (err, fd) {
//     if (err) {
//         console.log('打开文件失败');
//     } else {
//         console.log('文件打开成功');
//         console.log(fd);
//     }
// });
// fs.open('1.txt', 'r', function (err, fd) {
//     console.log(fd);
// });

// console.log('ok');

// var fd = fs.openSync('1.txt','r');
// console.log(fd);

// fs.open('1.txt', 'r', function (err, fd) {
//     if (err) {
//         console.log('打开文件失败');
//     } else {
//         console.log('打开文件成功');

//         var bf = new Buffer(10);
//         fs.read(fd, bf, 0, 4, null, function (err, len, newBf) {
//             console.log(bf,len,newBf);
//         });
//     }
// });
// fs.open('1.txt', 'r+', function (err, fd) {
//     if (err) {
//         console.log('打开文件失败');
//     } else {
//         console.log('打开文件成功');

//         var bf = new Buffer('efghijk');
//         fs.write(fd, bf, 0, 4, 0, function (err, len, newBf) {
//             fs.close(fd, function () {

//             })
//         });
//     }
// });

// var fileName = '1.txt';

// fs.watch(fileName, function(ev, fn){
//     console.log(ev);
//     if (fn) {
//         console.log('发生了改变：'+fn);
//     }else{
//         console.log('......');
//     }
// });

// fs.readdir('../FileSystem', function (err, fileList) {
//     fileList.forEach(function (f) {
//         fs.stat(f, function (err, info) {
//             switch (info.mode) {
//                 case 16822:
//                     console.log('[文件夹] ' + f);
//                     break;

//                 case 33206:
//                     console.log('[文件] ' + f);
//                     break;
//                 default:
//                     console.log('[其他类型] ' + f);
//                     break;
//             }
//         })
//     })
// })

// var projectData = {
//     'name': 'miaov',
//     'fileData': [{
//             'name': 'css',
//             'type': 'dir'
//         },
//         {
//             'name': 'js',
//             'type': 'dir'
//         },
//         {
//             'name': 'images',
//             'type': 'dir'
//         },
//         {
//             'name': 'index.html',
//             'type': 'file',
//             'content': `
// <html>
//     <head>
//         <title>title</title>
//     </head>
//     <body>
//         <h1>Hello</h1>
//     </body>
// </html>
//             `
//         }
//     ]
// }

// if (projectData.name) {
//     fs.mkdirSync(projectData.name);

//     var fileData = projectData.fileData;
//     if (fileData && Array.isArray(fileData)) {

//         fileData.forEach(function (f) {

//             f.path = projectData.name + '/' + f.name;

//             f.content = f.content || '';

//             switch (f.type) {
//                 case 'dir':
//                     fs.mkdirSync(f.path);
//                     break;
//                 case 'file':
//                     fs.writeFileSync(f.path, f.content);
//                     break;
//                 default:
//                     break;
//             }
//         })
//     }
// }

var filedir = './miaov/source';

fs.watch(filedir, function (ev, file) {
    //只要有一个文件发生变化，我们就需要对这个文件夹下的所有文件就行读取，然后合并

    fs.readdir(filedir, function (err, dataList) {

        var arr = [];

        dataList.forEach(function (f) {
            if (f) {
                var info = fs.statSync(filedir + '/' + f);

                if (info.mode == 33206) {
                    arr.push(filedir + '/' + f);
                }
            }
        });

        var content = '';
        arr.forEach(function (f) {
            var c = fs.readFileSync(f);
            // console.log(c);

            content += c.toString() + '\n';
        });

        console.log(content);
        fs.writeFile('./miaov/js/index.js', content);
    });
});