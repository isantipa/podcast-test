import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchButton from '../components/SearchButton';
import NumberOfPodcasts from '../components/NumberOfPodcasts';
import Header from "../components/Header";

function HomePage() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const targetUrl = encodeURIComponent("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);
        setPodcasts(parsedData.feed.entry);
        setLoading(false);
      } catch (error) {
        console.error('There was an error!', error);
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
      <NumberOfPodcasts podcastsCount={filteredPodcasts.length} />
      <SearchButton onSearch={handleSearch} />
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