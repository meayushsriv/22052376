import { useEffect, useState } from "react";
import axios from "axios";

export default function TopUsers() {
  const [users, su] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => su(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Top Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-3 border-b">
            {user.name} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
}
