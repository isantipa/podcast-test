import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PodcastSummary from '../components/PodcastSummary';
import LoadingSign from '../components/LoadingSign';
import '../styles/EpisodeDetailsPage.css';

function EpisodeDetailsPage() {
  const { podcastId, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        // Fetching episode data
        const episodeResponse = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
        if (!episodeResponse.ok) {
          throw new Error(`HTTP error! status: ${episodeResponse.status}`);
        }
        const episodeData = await episodeResponse.json();
        const foundEpisode = episodeData.results.find(ep => ep.trackId.toString() === episodeId);
        setEpisode(foundEpisode);

        // Fetching podcast data
        // Assume API can fetch single podcast details
        const podcastResponse = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}`);
        if (!podcastResponse.ok) {
          throw new Error(`HTTP error! status: ${podcastResponse.status}`);
        }
        const podcastData = await podcastResponse.json();
        const foundPodcast = podcastData.results[0];
        setCurrentPodcast(foundPodcast);

      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchEpisodeData();
  }, [podcastId, episodeId]);

  if (!episode || !currentPodcast) {
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
      <div className='page-container'>
        <div className='summary-container'>
          <PodcastSummary podcast={currentPodcast} />
        </div>
        <div className='episode-container'>
          <h2>{episode.trackName}</h2>
          <p dangerouslySetInnerHTML={{ __html: episode.description }} />
          <audio controls src={episode.previewUrl}>
            Your browser does not suppor the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetailsPage;