import { useEffect, useState } from "react";
import axios from "axios";

//Ayush Srivastava
export default function TrendingPosts() {
  const [posts, sp] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts?type=popular")
      .then((res) => sp(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
