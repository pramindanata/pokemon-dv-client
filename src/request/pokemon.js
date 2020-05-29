import axios from 'axios'

const url = process.env.APP_URL

export const getPokemons = (filter) => {
  if (filter.search === '') {
    filter.search = null
  }

  return axios(`${url}/api/pokemon`, {
    params: filter,
  })
}

export const getPokemon = (stringIndex) => {
  return axios(`${url}/api/pokemon/${stringIndex}`)
}
