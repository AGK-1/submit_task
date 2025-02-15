import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './nft/HomePage'; // Import the HomePage component
import NFT from './nft/nft'; // Corrected import of the NFT component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page with layout */}
          <Route path="/" element={<HomePage />} />

          {/* NFT page without layout */}
          <Route path="/nft" element={<NFT />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
