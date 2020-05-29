import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import PokemonCard from '~/components/shared/PokemonCard'
// import styles from './index.module.css'

const Top3 = (props) => {
  const { className, pokemons, ...rest } = props
  const classes = classnames(className)

  return (
    <div className={classes} {...rest}>
      <h5 className="mb-3">Top 3</h5>

      <Row>
        {pokemons.map((pokemon, i) => (
          <Col sm="6" md="4" key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              top={
                <Card.Body className="border-bottom py-2">
                  <div className="text-center">
                    <strong>
                      Rank #{i + 1} -{' '}
                      <span className="text-muted">{pokemon.stat} pts</span>
                    </strong>
                  </div>
                </Card.Body>
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

Top3.propTypes = {
  className: PropTypes.any,
  pokemons: PropTypes.array.isRequired,
}

export default Top3
