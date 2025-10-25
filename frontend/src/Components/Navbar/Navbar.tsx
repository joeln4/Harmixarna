import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div id="nav-logo">
        <a href="/">
          <img src="/images/Hårmixarna-logo.png" alt="logo" />
        </a>
      </div>
      <label htmlFor="menu-toggle" id="menu-icon">
        &#9776;
      </label>
      <input type="checkbox" id="menu-toggle"></input>
      <div id="nav-menu">
        <ul id="menu-list">
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
      </div>
    </nav>
  );
}
