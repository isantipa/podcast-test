import React from 'react';
import '../styles/PodcastSummary.css'

function PodcastSummary({ podcast }) {
    const title = podcast?.title?.label?.split(' - ')[0];
    const imageUrl = podcast?.['im:image']?.[2]?.label;
    const artist = podcast?.['im:artist']?.label;
    const summary = podcast?.summary?.label;

    return (
        <div className="podcast-summary-container">
            <img src={imageUrl} alt={title} />
            <div className="podcast-details">
                <h3>{title}</h3>
                <p>by {artist}</p>
            </div>
            <div className="podcast-description">
                <h4>Description:</h4>
                <p>{summary}</p>
            </div>
        </div>
    );
}

export default PodcastSummary;
