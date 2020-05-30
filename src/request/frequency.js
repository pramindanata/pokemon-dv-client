import axios from 'axios'

const url = process.env.APP_URL

export const getStat = (id, filter) => {
  return axios(`${url}/api/frequency/stat/${id}`, {
    params: filter,
  })
}