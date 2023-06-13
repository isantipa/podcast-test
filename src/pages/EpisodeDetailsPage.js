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
        const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const foundEpisode = data.results.find(ep => ep.trackId.toString() === episodeId);

        setEpisode(foundEpisode);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchEpisodeData();
  }, [podcastId, episodeId]);

  useEffect(() => {
    if (episode) {
      const fetchPodcastData = async () => {
        try {
          const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const podcastsData = data.feed.entry;
          const foundPodcast = podcastsData.find(podcast => podcast.id.attributes['im:id'] === podcastId);

          setCurrentPodcast(foundPodcast);
        } catch (error) {
          console.error('There was an error!', error);
        }
      };

      fetchPodcastData();
    }
  }, [episode, podcastId]);

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