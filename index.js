import http from "http";
import mongoose from "mongoose";
import { addPost, fetchPost , deletePost } from "./controllers/postController.js";

const server = http.createServer((req, resp) => {
  switch (req.method) {
    case "POST":
      addPost(req, resp);
      break;
    case "GET":
      fetchPost(req, resp);
      break;
    case "DELETE":
      deletePost(req, resp);
      break;
    default:
      resp.statusCode = 404;
      resp.setHeader("Content-Type", "applicationljson");
      resp.write(
        JSON.stringify({
          message: "route not found",
        })
      );
      resp.end();
  }
  //   resp.statusCode = 200;
  //   resp.setHeader("Content-Type", "Application/json");
  //   resp.write(JSON.stringify({ message: "hello node js" }));
  //   resp.end();
});

//CONNECTING TO THE DATA BASE
mongoose.connect("mongodb://localhost:27017/blogsdb");

server.listen(5000, (req, resp) => {
  console.log(`server listening to thr port 5000`);
});
