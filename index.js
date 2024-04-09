var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);

    // 1. Build the default filename
    var filename =
      "./public" + (q.pathname === "/" ? "/index.html" : q.pathname);

    // 2. Check if the file exists
    fs.readFile(filename, function (err, data) {
      if (err) {
        // 3. If the file isn't found, try with '.html' added
        filename += ".html";
        fs.readFile(filename, function (err, data) {
          if (err) {
            // Attempt to serve 404.html
            fs.readFile("./public/404.html", function (err, data) {
              if (err) {
                // If even 404.html is not found, send a basic error message
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("404 Not Found");
              } else {
                // 404.html found, serve it
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
              }
            });
          } else {
            // File found with '.html', serve it
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          }
        });
      } else {
        // File found without '.html', serve it
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
