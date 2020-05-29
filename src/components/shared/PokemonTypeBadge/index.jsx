import classnames from 'classnames'
import PropTypes from 'prop-types'
import { getTypeColor } from '~/util'

const PokemonTypeBadge = (props) => {
  const { className, name, ...rest } = props
  const classes = classnames(className)

  return (
    <div className={classes} {...rest}>
      <div
        className="px-2 text-white text-sm rounded"
        style={{ backgroundColor: getTypeColor(name) }}
      >
        {name}
      </div>
    </div>
  )
}

PokemonTypeBadge.propTypes = {
  className: PropTypes.any,
  name: PropTypes.string.isRequired,
}

export default PokemonTypeBadge
