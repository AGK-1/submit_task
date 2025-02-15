import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Correct path to App.css in the src folder
import logo from '../logo.svg'; // Correct path to logo.svg in the src folder

function HomePage() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link className="App-link" to="/">Home</Link> |{" "}
          <Link className="App-link" to="/nft">NFT</Link>
        </nav>
      </header>

    </div>
  );
}

export default HomePage;
