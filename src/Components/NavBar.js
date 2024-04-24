import { useRef } from "react";
import { useKey } from "../Hooks/useKey";
export default function NavBar({ resultLenght, query, setQuery }) {
  const inputEl = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  return (
    <nav className="navbar">
      <p className="logo">🍿 usePopcorn</p>
      <input
        className="search"
        type="text"
        placeholder="Search movies ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <span>Found {resultLenght} results</span>
    </nav>
  );
}
