export const filterQuery = (query) => {
  const valid = Object.keys(query)
    .filter((k) => query[k] !== '' && query[k] != null)
    .map((k) => k)
  const result = valid.reduce((p, c) => {
    p[c] = query[c]

    return p
  }, {})

  return result
}
