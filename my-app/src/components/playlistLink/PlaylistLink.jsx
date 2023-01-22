import React from 'react'
import './PlaylistLink.css'

const PlaylistLink = ({ IconPlay, IconStop, textSong, textArtist }) => {
  return (
    <div className='playlistLink'>
        {IconPlay} {IconStop}
        <span className='playlistLinkText'>{textSong}: by {textArtist}</span>
    </div>
  )
}

export default PlaylistLink