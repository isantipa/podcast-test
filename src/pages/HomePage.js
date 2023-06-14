import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchButton from '../components/SearchButton';
import NumberOfPodcasts from '../components/NumberOfPodcasts';
import Header from "../components/Header";
import LoadingSign from "../components/LoadingSign";
import "../styles/HomePage.css";

function HomePage() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const lastFetch = localStorage.getItem('lastFetch');
      // If it's been more than a day since the last fetch, fetch data again
      if (!lastFetch || Date.now() - lastFetch > 24 * 60 * 60 * 1000) {
        const targetUrl = encodeURIComponent("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
        try {
          const response = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);

           // Parse and store data in localStorage, also store the fetch time
          if (data && data.contents) {
            const parsedData = JSON.parse(data.contents);
            localStorage.setItem('podcastsData', JSON.stringify(parsedData.feed.entry));
            localStorage.setItem('lastFetch', Date.now());
            setPodcasts(parsedData.feed.entry);
            setFilteredPodcasts(parsedData.feed.entry);
            setLoading(false);
          } else {
            throw new Error('API response is missing contents');
          }
        } catch (error) {
          setError('There was an error! ' + error);
          console.error('There was an error!', error);
        }
      } else {
        const storedData = localStorage.getItem('podcastsData');
        if (storedData) {
          const podcastsData = JSON.parse(storedData);
          setPodcasts(podcastsData);
          setFilteredPodcasts(podcastsData);
          setLoading(false);
        }
      }
    };

    fetchPodcasts();
  }, []);

  // Perform filtering only when search term changes
  const handleSearch = useCallback((search) => { 
    setSearchTerm(search);
    setFilteredPodcasts(podcasts.filter((podcast) =>
      podcast.title.label.toLowerCase().includes(search.toLowerCase())
    ));
  }, [podcasts]);

  if (loading) {
    return (
      <div>
        <Header />
        <LoadingSign />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="number-search-container">
        <NumberOfPodcasts podcastsCount={filteredPodcasts.length} />
        <SearchButton onSearch={handleSearch} />
      </div>
      <div className="podcast-grid">
        {filteredPodcasts.map((podcast) => {
          const title = podcast.title.label.split(' - ')[0];
          return (
            <Link 
              to={{
                pathname: `/podcast/${podcast.id.attributes['im:id']}`,
                state: { podcast }
              }} 
              key={podcast.id.attributes['im:id']} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="podcast-box">
                <div className="image-container">
                  <img src={podcast['im:image'][2].label} alt={podcast.title.label} />
                </div>
                <h2>{title}</h2>
                <p>Author: {podcast['im:artist'].label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;