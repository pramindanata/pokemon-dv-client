import axios from 'axios'

const url = process.env.APP_URL

export const getType = (id, filter) => {
  return axios(`${url}/api/frequency/type/${id}`, {
    params: filter,
  })
}

export const getStatAVG = (id) => {
  return axios(`${url}/api/frequency/stat-avg-per-generation/${id}`)
}
