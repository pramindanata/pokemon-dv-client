import axios from 'axios'

const url = process.env.APP_URL

export const getTop = (id, filter) => {
  return axios(`${url}/api/top/${id}`, {
    params: filter,
  })
}
