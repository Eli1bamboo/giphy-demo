import axios from 'axios'

export const getTrendingGifs = () => {
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

export const performSearch = (query) => {
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
