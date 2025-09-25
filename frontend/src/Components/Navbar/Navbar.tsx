import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Hårmixarna
      </a>
      <ul>
        <li>
          <a href="/about">Om oss</a>
        </li>
        <li>
          <a href="/contact">Kontakt</a>
        </li>
        <li>
          <a href="/booking">Boka</a>
        </li>
      </ul>
    </nav>
  );
}
