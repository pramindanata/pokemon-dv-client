import classnames from './node_modules/classnames'
import PropTypes from './node_modules/prop-types'
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
