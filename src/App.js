import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import EpisodeDetailsPage from './pages/EpisodeDetailsPage';
import './styles/App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/podcast/:podcastId" element={<PodcastDetailsPage />} />
                <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;