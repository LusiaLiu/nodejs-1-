var http = require("http");
var fs = require("fs");


function getFile(path){
	var files = new Array();

	console.log("path : " + path);

	if(isDir(path)){
		var tempFiles = fs.readdirSync(path);	
		for (var i = 0; i < tempFiles.length; i++) {
			var file = tempFiles[i];
			files = files.concat(getFile(path + '\\' + file));
		};	
	}else{

		files.push(path);
	}
	console.log("files: ");
	console.log(files);
	return files;
};

function isDir(path){
	var stats = fs.statSync(path);
	if(stats.isDirectory()){
		return true;
	}else{
		return false;
	}
};


var files = getFile('page');

console.log(files);

http.createServer(function (request, response){

	console.log('request.url : ' + request.url);

	var url = request.url;

	var my = '/helloworld';

	var urls = url.split('/');

	console.log(urls);
	
	console.log();
	console.log();

	var isValid = false;

	if(urls.length == 2){
		console.log(urls.length);
		for (var i = 0; i < files.length; i++) {
			var urlnn = urls[1] + '.html';
			if(urlnn == files[i]){
				isValid = true;
			}
		};
	}

	if (isValid) {
		fs.readFile('./page' + url + '.html', function (err, data) {
 			if (err) {
 				throw err;
 			}
  			response.writeHead(200, {'Content-Type':'html'});
			response.end(data);
		});
	}else{

		response.writeHead(404, {'Content-Type':'text/plain'});
		response.end("error.");
	}


	
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');

