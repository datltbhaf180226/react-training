import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {post ? (
        <ul>
          <li>ID: {post.id}</li>
          <li>Title: {post.title}</li>
          <li>Body: {post.body}</li>
        </ul>
      ) : "Loading..."}
    </div>
  );
}

export default PostDetail;
