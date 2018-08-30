import React, { Component } from 'react'

import FavButtons from './FavButtons'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import _find from 'lodash/find'

class Gif extends Component {
  shouldComponentUpdate () {
    return true
  }

  render () {
    const {
      url,
      title,
      slug,
      id,
      onAddToFavorites,
      onRemoveFromFavorites,
      disabled
    } = this.props

    return (
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <img src={url} style={{ width: '100%' }} title={title} alt={title} />
          <CardContent>
            <Typography gutterBottom variant='headline' component='h2'>
              {title}
            </Typography>
            <Typography component='p'>{slug}</Typography>
          </CardContent>
          <FavButtons
            id={id}
            disabled={disabled}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
            url={url}
          />
        </Card>
      </Grid>
    )
  }
}

export default Gif
