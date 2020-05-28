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

export const getImageUrl = (imageUrl) => {
  return `/api/static/${imageUrl}`
}

export const getTypeColor = (type) => {
  const colors = {
    grass: '#69c23d',
    poison: '#923a92',
    fire: '#ed6d12',
    flying: '#8e6feb',
    dragon: '#5e1df7',
    water: '#4578ed',
    bug: '#97a51d',
    normal: '#9c9c63',
    electric: '#f6c913',
    ground: '#dbb54d',
    fairy: '#e87890',
    fighting: '#ae2a24',
    psychic: '#f73670',
    rock: '#a48f32',
    steel: '#a0a0c0',
    ice: '#7ecece',
    ghost: '#644e88',
    dark: '#644e40',
  }

  return colors[type.toLowerCase()]
}
