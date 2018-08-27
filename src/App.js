import React, { Component } from 'react'
import './App.css'

import axios from 'axios'
import SearchForm from './Components/SearchForm'
import GifList from './Components/GifList'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'

import _find from 'lodash/find'
import _includes from 'lodash/includes'
import _remove from 'lodash/remove'

const styles = {
  paper: { padding: '16px' },
  divider: {
    margin: '16px 0',
    width: '100%',
    height: '1px',
    background: 'silver'
  }
}
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      favorites: [],
      gifs: [],
      loading: true,
      listTitle: null,
      openSnackbar: false
    }
  }

  getTrendingGifs = () => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/trending?limit=20&api_key=mKfQsfc5zGYS7eJlAxWRvgRWfGszZcV1`
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          loading: false,
          listTitle: 'Trendy Gifs:'
        })
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error)
      })
  }

  performSearch = (query) => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${query}&limit=20&api_key=mKfQsfc5zGYS7eJlAxWRvgRWfGszZcV1`
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          loading: false,
          listTitle: 'Showing results for ' + query + ':'
        })
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error)
      })
  }

  componentDidMount () {
    this.getTrendingGifs()
  }

  handleAddToFavorites = (value) => {
    const { gifs, favorites } = this.state

    const gifId = value

    const gif = _find(gifs, { id: gifId })

    const isFav = _find(favorites, { id: gifId })

    if (gif && !isFav) {
      favorites.push(gif)

      this.setState({
        favorites
      })
    } else {
      this.setState({
        openSnackbar: true,
        snackbarMessage: 'This GIF is already in favorites.'
      })
    }
  }

  handleRemoveFromFavorites = (value) => {
    const { favorites } = this.state

    const gifId = value

    const gif = _find(favorites, { id: gifId })

    const isFav = _find(favorites, { id: gifId })

    if (gif && isFav) {
      const newFavorites = _remove(favorites, (f) => f.id !== gifId)

      this.setState({
        favorites: newFavorites,
        openSnackbar: true,
        snackbarMessage: 'Removed from favorites.'
      })
    }
  }

  closeSnackbar = () => {
    this.setState({
      openSnackbar: false
    })
  }

  render () {
    const {
      gifs,
      favorites,
      loading,
      listTitle,
      openSnackbar,
      snackbarMessage,
      disabled
    } = this.state

    console.log(disabled)

    return (
      <Grid container>
        <SearchForm onSearch={this.performSearch} />

        <div style={styles.divider} />

        <Grid container>
          <Paper style={styles.paper}>
            {favorites && favorites.length ? (
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant='title' gutterBottom>
                    Favorites
                  </Typography>
                </Grid>
                <GifList
                  data={favorites}
                  disabled
                  onAddToFavorites={this.handleAddToFavorites}
                  onRemoveFromFavorites={this.handleRemoveFromFavorites}
                />
              </Grid>
            ) : (
              <Typography variant='title' gutterBottom>
                No favorites selected yet...
              </Typography>
            )}
          </Paper>

          <div style={styles.divider} />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <Paper style={styles.paper}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant='title' gutterBottom>
                    {listTitle}
                  </Typography>
                </Grid>
                <GifList
                  data={gifs}
                  favorites={favorites}
                  onAddToFavorites={this.handleAddToFavorites}
                  onRemoveFromFavorites={this.handleRemoveFromFavorites}
                />
              </Grid>
            </Paper>
          )}
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={this.closeSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>{snackbarMessage}</span>}
        />
      </Grid>
    )
  }
}
