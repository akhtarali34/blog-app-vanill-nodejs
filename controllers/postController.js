import Post from "../Models/postModel.js";
import mongodb from "mongodb";
import url from "url";






//////////////////// FETCH BLOG ///////////////////////////////////////////
export const fetchPost = async (req, resp) => {
  console.log(
    "..................................................................."
  );
  if (req.url === "/api/fetchblogs") {
    try {
      let blogs = await Post.find({});

      // Check if blogs were found
      if (blogs.length === 0) {
        resp.writeHead(404, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ message: "No blog posts found" }));
        return;
      }

      resp.writeHead(200, { "Content-Type": "application/json" });
      resp.end(JSON.stringify(blogs));
    } catch (error) {
      console.error(error); // Log the error
      resp.writeHead(500, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ error: "Internal server error" }));
    }
  } else {
    resp.writeHead(404, { "Content-Type": "application/json" });
    resp.end(JSON.stringify({ error: "Not Found" }));
  }
};

//////////////////////////////////////ADD POST
export const addPost = (req, resp) => {
  console.log("add.....................................................");
  let body = '';

  if (req.url === "/api/addblogs") {
    // Collect data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    
    req.on("end", async () => {
      const parsedBody = JSON.parse(body);
      console.log(parsedBody);

      try {
        let add = new Post(parsedBody);
        let savepost = await add.save();
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(savepost));
      } catch (error) {
        resp.writeHead(500, { "Content-Type": "application/json" });
        console.log(error);
        resp.end(JSON.stringify({ error: "Internal server error" }));
      }
    });
  }
};

/////////////////////////////////// DELETE POST /////////////////////////////////////////
export const deletePost = async (req, resp) => {
  console.log(":::::::::::::::::::::::::::::;")
  
  if (req.url === "/api/deleteblogs") {
    try {
      console.log(
        "delete.................................................................."
      );

      let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
      console.log(baseUrl);
      let id = req.url.split("/");
      console.log(id);

      let blogs = await Post.findByIdAndDelete({_id: id});
      // Check if blogs were found
      if (!blogs) {
        resp.writeHead(404, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ message: "No blog posts found" }));
        return;
      }

      resp.writeHead(200, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({message:"blog deleted succesfully"}));

    } catch (error) {
      console.error(error); // Log the error
      resp.writeHead(500, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ error: "Internal server error" }));
    }


  } else {
    resp.writeHead(404, { "Content-Type": "application/json" });
    resp.end(JSON.stringify({ error: "Not Found" }));
  }
};