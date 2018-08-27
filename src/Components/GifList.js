import React from 'react'
import Gif from './Gif'
import NoGifs from './NoGifs'

const GifList = (props) => {
  const results = props.data

  const { onAddToFavorites, onRemoveFromFavorites, favorites, disabled } = props

  let gifs

  if (results.length > 0) {
    gifs = results.map((gif) => (
      <Gif
        url={gif.images.fixed_height.url}
        key={gif.id}
        title={gif.title}
        slug={gif.slug}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        id={gif.id}
        favorites={favorites}
        disabled={disabled}
      />
    ))
  } else {
    gifs = <NoGifs />
  }

  return gifs
}

export default GifList
