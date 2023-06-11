import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PodcastSummary from '../components/PodcastSummary';
import EpisodeCount from '../components/EpisodeCount';
import EpisodeList from '../components/EpisodeList';
import '../styles/PodcastDetailsPage.css';

function PodcastDetailsPage() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodeCount, setEpisodeCount] = useState(0);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchPodcastData = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const podcastsData = data.feed.entry;
        const foundPodcast = podcastsData.find(podcast => podcast.id.attributes['im:id'] === podcastId);

        const episodesResponse = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
        if (!episodesResponse.ok) {
          throw new Error(`HTTP error! status: ${episodesResponse.status}`);
        }
        const episodesData = await episodesResponse.json();
        const trackCount = episodesData.resultCount > 0 ? episodesData.results[0].trackCount : 0;

        setPodcast(foundPodcast);
        setEpisodeCount(trackCount);
        setEpisodes(episodesData.results.slice(1));
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchPodcastData();
  }, [podcastId]);

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className='page-container'>
        <div className='summary-container'>
          <PodcastSummary podcast={podcast} />
        </div>
        <div className='episode-container'>
          <EpisodeCount count={episodeCount} />
          <EpisodeList episodes={episodes} />
        </div>
      </div>
    </div>
  );
}

export default PodcastDetailsPage;
