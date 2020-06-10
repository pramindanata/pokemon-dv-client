import axios from 'axios'

const url = process.env.APP_URL

export const getStat = (id, filter) => {
  return axios(`${url}/api/distribution/stat/${id}`, {
    params: filter,
  })
}

export const getStatPerType = (id, filter) => {
  return axios(`${url}/api/distribution/stat-per-type/${id}`, {
    params: filter,
  })
}

export const getLegendaryVNonStat = (id, filter) => {
  return axios(`${url}/api/distribution/legendary-v-non/${id}`, {
    params: filter,
  })
}
