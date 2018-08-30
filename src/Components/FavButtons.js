import React, { Component } from 'react'

import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import _find from 'lodash/find'

class FavButtons extends Component {
  constructor (props) {
    super()

    const { disabled } = props

    this.state = {
      disabled
    }
  }

  handleOnAddToFavorites = () => {
    const { onAddToFavorites, id, favorites } = this.props

    const isFav = !_find(favorites, { id: id })

    if (isFav) {
      this.setState({
        disabled: true
      })
    }

    onAddToFavorites(id)
  }

  handleOnRemoveFromFavorites = () => {
    const { onRemoveFromFavorites, id } = this.props

    this.setState({
      disabled: false
    })

    onRemoveFromFavorites(id)
  }

  render () {
    const { url } = this.props
    const { disabled } = this.state

    return (
      <CardActions>
        <Button
          disabled={disabled}
          variant='contained'
          color='primary'
          onClick={this.handleOnAddToFavorites}
        >
          <i className='material-icons'>favorite</i>
        </Button>

        <Button
          variant='contained'
          color='secondary'
          onClick={this.handleOnRemoveFromFavorites}
        >
          <i className='material-icons'>delete_forever</i>
        </Button>
        <Button variant='contained' href={url} target={'blank'}>
          <i className='material-icons'>exit_to_app</i>
        </Button>
      </CardActions>
    )
  }
}

export default FavButtons
