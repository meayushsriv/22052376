import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-around">
      <Link to="/" className="font-bold">
        Top Users
      </Link>
      <Link to="/trending" className="font-bold">
        Trending Posts
      </Link>
      <Link to="/feed" className="font-bold">
        Feed
      </Link>
    </nav>
  );
}
