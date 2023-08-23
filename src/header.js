import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="nav">
        <Link to="/">
          <img src="/assets/krakengourmet.svg" alt="Kraken Gourmet Logo" height="180px" />
        </Link>
        <div className="navbar">
          <Link to="/">
            <i class="fa-solid fa-house"></i>
          </Link>
          <Link to="/">
            <i class="fa-solid fa-wine-glass"></i>
          </Link>
          <Link to="/">
            <i class="fa-solid fa-utensils"></i>
          </Link>
          <Link to="/">
            <i class="fa-solid fa-burger"></i>
          </Link>
          <Link to="/add">
            <i class="fa-solid fa-plus"></i>
          </Link>
          <Link to="/">
            <i class="fa-solid fa-star"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
