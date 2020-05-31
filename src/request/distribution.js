import axios from 'axios'

const url = process.env.APP_URL

export const getStatPerType = (id, filter) => {
  return axios(`${url}/api/distribution/stat-per-type/${id}`, {
    params: filter,
  })
}
