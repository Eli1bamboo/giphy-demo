import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'

export default class SearchForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchText: ''
    }
  }

  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value })
  }

  handleSearch = (e) => {
    const { onSearch } = this.props

    const searchText = e.target.value

    this.setState({ searchText })

    setTimeout(() => {
      onSearch(searchText)
    }, 15)
  }

  render () {
    const { searchText } = this.state

    return (
      <TextField
        id='search'
        label='Search'
        value={searchText}
        onChange={this.handleSearch}
        margin='normal'
      />
    )
  }
}
