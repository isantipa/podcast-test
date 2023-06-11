import React from 'react';
import '../styles/EpisodeList.css'

function formatDuration(duration) {
  const hours = Math.floor(duration / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript son base 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function EpisodeList({ episodes }) {
  return (
    <div className='table-container'>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {episodes.map((episode) => (
          <tr key={episode.trackId}>
            <td>
              <a href={`/episode/${episode.trackId}`}>{episode.trackName}</a>
            </td>
            <td>{formatDate(episode.releaseDate)}</td>
            <td>{formatDuration(episode.trackTimeMillis / 1000)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default EpisodeList;