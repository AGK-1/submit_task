import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from 'react-router-dom';
import HomePage from './HomePage';
import './NFT.css'; // Import the CSS file for NFT page styling


function NFT() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logoUrl: "",
        nftId: "",
        userWalletAddress: "string",
    });

    const [successMessage, setSuccessMessage] = useState("");

    const [videoData, setVideoData] = useState([
        { id: 'GJryM1_lpZM', title: 'Loading...' },
        { id: 'sjHuxomM4ck', title: 'Loading...' },
        { id: '6H91jDJJZcM', title: 'Loading...' }
    ]);

    const API_KEY = 'AIzaSyByh7OVYJEkeyU1G-NcyIK-55V8vyLUCM8'; // Replace with your actual API key

    useEffect(() => {
        // Get unique video IDs
        const uniqueIds = [...new Set(videoData.map(video => video.id))];

        // Fetch video titles for each unique ID
        const fetchVideoTitles = async () => {
            try {
                const titlesMap = {};

                for (const id of uniqueIds) {
                    const response = await fetch(
                        `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet`
                    );
                    const data = await response.json();

                    if (data.items && data.items.length > 0) {
                        titlesMap[id] = data.items[0].snippet.title;
                    } else {
                        titlesMap[id] = 'Title not available';
                    }
                }

                // Update all videos with their titles
                setVideoData(prevData =>
                    prevData.map(video => ({
                        ...video,
                        title: titlesMap[video.id] || 'Title not available'
                    }))
                );

            } catch (error) {
                console.error('Error fetching video titles:', error);
            }
        };

        fetchVideoTitles();
    }, []);





    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            nftId: Number(formData.nftId), // Ensure nftId is a number
        };

        try {
            const response = await fetch("http://localhost:3005/api/create", { // ✅ Corrected URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${result.message}`);
            }

            setSuccessMessage("🎉 NFT created successfully!");
            //console.log("NFT created successfully:", result);
            //alert(result);

            // Reset form
            setFormData({
                name: "",
                description: "",
                logoUrl: "",
                nftId: "",
                userWalletAddress: "",
            });

        } catch (error) {
            console.error("Error creating NFT:", error);
            alert(`Error creating NFT: ${error.message}`);
        }
    };

    return (
        <div className="nftContainer">
            <div className="connect_Wallet">
                <button className="special">@</button>
                <button>Connect with wallet</button>
            </div><br></br>
            <header><h1 className="nft-title">Discovery & Collect <br></br>Extrdaordinary NFT's</h1></header>
            <p className="underHead">Enter the world of digital art and collection. Explore unique <br></br>NFTscreated by artist worldwide</p>
            <div className="headre_bt">
                <button>Start creating</button>
                <button className="btnClass">watch demo</button>

            </div>
            <div className="nft-content">
                {successMessage && <p className="success-message">{successMessage} Mint your NFT </p>} {/* Show success message */}
                {/* <p className="nft-description">
                                
                </p> */}
                <form className="nft-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">NFT Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter NFT name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter NFT description"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    <button type="submit">Create NFT</button>
                </form>

                <Link className="App-link" to="/">HomePage</Link>
            </div>
            <div className="footer">
                <h1>Your nft gallery</h1><br></br>
                <div className="videoContent">
                    <div className="video-container">
                        {videoData.map((video, index) => (
                            <div key={index} className="video-card">
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allowFullScreen
                                ></iframe>
                                <p>Video Name: {video.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
               



            </div>
        </div>
    );
}

export default NFT;