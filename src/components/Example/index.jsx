import classnames from 'classnames'
import PropTypes from 'prop-types'
// import styles from './index.module.css'

const Example = (props) => {
  const { className, ...rest } = props
  const classes = classnames(className)

  return (
    <div className={classes} {...rest}>
      <p>I am an Example Component</p>
    </div>
  )
}

Example.propTypes = {
  className: PropTypes.any,
}

export default Example
