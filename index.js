var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);

    var filename =
      "./public" + (q.pathname === "/" ? "/index.html" : q.pathname);

    fs.readFile(filename, function (err, data) {
      if (err) {
        filename += ".html";
        fs.readFile(filename, function (err, data) {
          if (err) {
            fs.readFile("./public/404.html", function (err, data) {
              if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("404 Not Found");
              } else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
              }
            });
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          }
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
