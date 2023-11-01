"use strict";
//��������Ҫ��ģ��
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

//��������
var httpServer = http.createServer(processRequest);

var port = 3000;

//ָ��һ�������Ľӿ�
httpServer.listen(port, function() {
    console.log(`app is running at port:${port}`);
    console.log(`url: http://localhost:${port}`);
    cp.exec(`explorer http://localhost:${port}`, function () {
    });
});

//��Ӧ����ĺ���
function processRequest (request, response) {
    //mime����
    var mime = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };
    
    //request�����г���ʶ���ַ���
    var requestUrl = request.url;
    //urlģ���parse���� ����һ���ַ���������һ��url����,�г���·��
    var pathName = url.parse(requestUrl).pathname;

    //��·�����룬��ֹ��������
    var pathName = decodeURI(pathName);

    //���301�ض������⣬���pathnameû��/��β������û����չ��
    if (!pathName.endsWith('/') && path.extname(pathName) === '') {
        pathName += '/';
        var redirect = "http://" + request.headers.host + pathName;
        response.writeHead(301, {
            location: redirect
        });
        //response.end����������Ӧ��ɺ�رձ��ζԻ���Ҳ����д��HTTP��Ӧ�ľ������ݡ�
        response.end();
    }

    //��ȡ��Դ�ļ��ľ���·��
    var filePath = path.resolve(__dirname + pathName);
    console.log(filePath);
    //��ȡ��Ӧ�ļ����ĵ�����
    //����ͨ��path.extname����ȡ�ļ��ĺ�׺��������extname����ֵ������.��������ͨ��slice�������޳�����.����
    //����û�к�׺�����ļ�������һ����Ϊ��unknown��
    var ext = path.extname(pathName);
    ext = ext ? ext.slice(1) : 'unknown';

    //δ֪������һ����"text/plain"����
    var contentType = mime[ext] || "text/plain";

    fs.stat(filePath, (err, stats) => {
        if (err) {
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        }
        //û���� �����ļ�����
        if (!err && stats.isFile()) {
            readFile(filePath, contentType);
        }
        //���·����Ŀ¼
        if (!err && stats.isDirectory()) {
            var html = "<head><meta charset = 'utf-8'/></head><body><ul>";
            //��ȡ��·�����ļ�
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.log("��ȡ·��ʧ�ܣ�");
                } else {
                    //����һ�����ӱ��������û�����
                    var flag = false;
                    for (var file of files) {
                        //�����Ŀ¼���ҵ�index.html��ֱ�Ӷ�ȡ����ļ�
                        if (file === "index.html") {
                            readFile(filePath + (filePath[filePath.length-1]=='/' ? '' : '/') + 'index.html', "text/html");
                            flag = true;
                            break;
                        };
                        html += `<li><a href='${file}'>${file}</a></li>`;
                    }
                    if(!flag) {
                        html += '</ul></body>';
                        response.writeHead(200, { "content-type": "text/html" });
                        response.end(html);
                    }
                }
            });
        }

        //��ȡ�ļ��ĺ���
        function readFile(filePath, contentType){
            response.writeHead(200, { "content-type": contentType });
            //���������󣬶��ļ�
            var stream = fs.createReadStream(filePath);
            //������
            stream.on('error', function() {
                response.writeHead(500, { "content-type": contentType });
                response.end("<h1>500 Server Error</h1>");
            });
            //��ȡ�ļ�
            stream.pipe(response);
        }
    });
}