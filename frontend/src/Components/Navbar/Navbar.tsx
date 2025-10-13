import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        <img id="nav-logo" src="/images/Hårmixarna-logo.png" alt="logo"/>
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
