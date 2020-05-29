import Link from 'next/link'
import { Card } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// import styles from './index.module.css'

const Sidebar = (props) => {
  const { className, ...rest } = props
  const classes = classnames(className)

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Header>Menu</Card.Header>

        <Card.Body></Card.Body>
      </Card>
    </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.any,
}

export default Sidebar
