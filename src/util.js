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

export const hexToRGB = (h, a = 1) => {
  let r = 0
  let g = 0
  let b = 0

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return `rgb(${+r},${+g},${+b},${a})`
}

export const genTypeBG = (types) => {
  let background = null

  if (types.length === 1) {
    background = hexToRGB(getTypeColor(types[0].name), 0.6)
  } else {
    const total = types.length
    const string = types
      .map(
        (type) => `${hexToRGB(getTypeColor(type.name), 0.6)} ${100 / total}%`,
      )
      .join(',')
    background = `linear-gradient(90deg, ${string})`
  }

  console.log(background)

  return background
}

export const statBuilder = (stats) => {
  const statDict = {
    power: {
      name: 'Power',
      max: 780,
    },
    hp: {
      name: 'HP',
      max: 255,
    },
    attack: {
      name: 'Attack',
      max: 190,
    },
    defend: {
      name: 'Defend',
      max: 230,
    },
    speed: {
      name: 'Speed',
      max: 180,
    },
    spAttack: {
      name: 'Sp. Attack',
      max: 194,
    },
    spDefend: {
      name: 'Sp. Defend',
      max: 230,
    },
  }

  return Object.keys(stats).map((key) => ({
    ...statDict[key],
    value: stats[key],
  }))
}
