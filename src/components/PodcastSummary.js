import React from 'react';
import '../styles/PodcastSummary.css'

function PodcastSummary({ podcast }) {
    const title = podcast.title.label.split(' - ')[0];

    return (
        <div className="podcast-summary-container">
            <img src={podcast['im:image'][2].label} alt={podcast.title.label} />
            <div className="podcast-details">
                <h3>{title}</h3>
                <p>by: {podcast['im:artist'].label}</p>
            </div>
            <div className="podcast-description">
                <h4>Description:</h4>
                <p>{podcast.summary.label}</p>
            </div>
        </div>
    );
}

export default PodcastSummary;