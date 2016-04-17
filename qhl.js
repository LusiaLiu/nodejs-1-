var http = require('http');

http.createServer(function (request, response){

	console.log("referre", request.headers.referer, "\n");

	var url = request.headers.referer;

	var my = 'http://127.0.0.1:8888/helloworld';

	console.log("url", url);
	console.log("my ", my);

    console.log();
    console.log();

	if (url == my) {
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end("what the ds hell.");
	} else {
        response.writeHead(404, {'Content-Type':'text/plain'});
        response.end("error.");
    }
}).listen(8888);
