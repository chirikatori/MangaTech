import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="bg-zinc-950 text-white p-4 flex justify-between items-center shadow-md min-h-[100px]">
      <h1 className="text-4xl font-bold">
        <Link to="/">
        <span className="text-orange-500">Manga</span>
        <span className="text-white-500">Tech</span>
        </Link>
        
        </h1>
      <nav className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
      </nav>
    </header>
  );
}

export default Header;