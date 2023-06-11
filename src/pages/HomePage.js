import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchButton from '../components/SearchButton';
import NumberOfPodcasts from '../components/NumberOfPodcasts';
import Header from "../components/Header";
import "../styles/HomePage.css";

function HomePage() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const lastFetch = localStorage.getItem('lastFetch');

      if (!lastFetch || Date.now() - lastFetch > 24 * 60 * 60 * 1000) {
        const targetUrl = encodeURIComponent("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
        try {
          const response = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const parsedData = JSON.parse(data.contents);
          localStorage.setItem('podcastsData', JSON.stringify(parsedData.feed.entry));
          localStorage.setItem('lastFetch', Date.now());
          setPodcasts(parsedData.feed.entry);
          setLoading(false);
        } catch (error) {
          console.error('There was an error!', error);
        }
      } else {
        const storedData = localStorage.getItem('podcastsData');
        if (storedData) {
          setPodcasts(JSON.parse(storedData));
          setLoading(false);
        }
      }
    };
      
    fetchPodcasts();
  }, []);
  
  const handleSearch = (search) => {
    setSearchTerm(search);
  }

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Cargando podcasts...</p>;
  }

  return (
    <div>
      <Header />
      <div className="number-search-container">
        <NumberOfPodcasts podcastsCount={filteredPodcasts.length} />
        <SearchButton onSearch={handleSearch} />
      </div>
      <div className="podcast-grid">
        {filteredPodcasts.map((podcast) => (
          <Link to={`/podcast/${podcast.id.attributes['im:id']}`} key={podcast.id.attributes['im:id']}>
            <div className="podcast-box">
              <img src={podcast['im:image'][2].label} alt={podcast.title.label} />
              <h2>{podcast.title.label}</h2>
              <p>Author: {podcast['im:artist'].label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;