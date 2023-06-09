import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import EpisodeDetailsPage from './pages/EpisodeDetailsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
                <Route path="/episode/:id" element={<EpisodeDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;