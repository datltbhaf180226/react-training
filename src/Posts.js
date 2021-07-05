import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemovePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
    toast.success(`Remove sucessfully`);
  };

  return (
    <div>
      {posts ? (
        <table className="posts-table">
          <thead>
            <tr>
              <th width="10%">ID</th>
              <th width="70%">Title</th>
              <th width="20%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td className="post-actions">
                  <div>
                    <button onClick={() => handleRemovePost(index)}>
                      Remove
                    </button>
                  </div>
                  <div>
                    <Link to={`/postDetail/${post.id}`}>View Detail</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Posts;
