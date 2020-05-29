import classnames from 'classnames'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'
// import styles from './index.module.css'

import TypeBadge from '~/components/shared/PokemonTypeBadge'

import { getImageUrl } from '~/util'

const PokemonCard = (props) => {
  const { className, pokemon, ...rest } = props
  const classes = classnames(className)

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Body className="border-bottom py-2">
          <div className="text-center">
            <strong className="mb-0 text-sm text-muted">{`#${pokemon.index
              .toString()
              .padStart(3, '0')}`}</strong>
          </div>
        </Card.Body>

        <Card.Img
          variant="top"
          src={getImageUrl(pokemon.image)}
          className="border-bottom"
        ></Card.Img>

        <Card.Body>
          <div className="text-center">
            <Card.Title>{pokemon.name}</Card.Title>
          </div>

          <div className="d-flex mb-3 justify-content-center">
            {pokemon.types.map((type, i) => (
              <TypeBadge
                key={type.name}
                name={type.name}
                className={i === 0 && 'mr-1'}
              />
            ))}
          </div>

          <Link
            passHref
            href="/pokemon/[id]"
            as={`/pokemon/${pokemon.stringIndex}`}
          >
            <Button variant="primary" block className="text-white">
              See Detail
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}

PokemonCard.propTypes = {
  className: PropTypes.any,
  pokemon: PropTypes.object.isRequired,
}

export default PokemonCard
