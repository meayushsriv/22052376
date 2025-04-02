import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [posts, sp] = useState([]);

  const fp = () => {
    axios
      .get("http://localhost:5000/posts?type=latest")
      .then((res) => sp(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fp();
    const interval = setInterval(fp, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Live Feed</h1>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
