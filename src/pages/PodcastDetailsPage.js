import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PodcastSummary from '../components/PodcastSummary';

function PodcastDetailsPage() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('podcastsData');
    if (storedData) {
      const podcasts = JSON.parse(storedData);
      const foundPodcast = podcasts.find(p => p.id.attributes['im:id'] === podcastId);
      setPodcast(foundPodcast);
    }
  }, [podcastId]);

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <PodcastSummary podcast={podcast} />
    </div>
  );
}

export default PodcastDetailsPage;
