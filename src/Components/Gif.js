import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import _find from 'lodash/find'

class Gif extends Component {
  constructor (props) {
    super()

    this.state = {
      disabled: false
    }
  }

  componentWillReceiveProps () {
    const { favorites, disabled, id } = this.props

    const isFav = !!_find(favorites, { id: id })

    if (isFav && !disabled) {
      this.setState({
        disabled: true
      })
    } else if (!isFav && disabled) {
      this.setState({
        disabled: true
      })
    }
  }

  render () {
    const {
      url,
      title,
      slug,
      id,
      onAddToFavorites,
      onRemoveFromFavorites
    } = this.props

    const { disabled } = this.props

    const value = id

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
          <CardActions>
            <Button
              disabled={disabled}
              variant='contained'
              color='primary'
              onClick={() => onAddToFavorites(value)}
            >
              <i className='material-icons'>favorite</i>
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => onRemoveFromFavorites(value)}
            >
              <i className='material-icons'>delete_forever</i>
            </Button>
            <Button variant='contained' href={url} target={'blank'}>
              <i className='material-icons'>exit_to_app</i>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default Gif
