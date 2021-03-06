import Link from 'next/link'
import { useRouter } from 'next/router'
import { Card, ListGroup } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// import styles from './index.module.css'

import { getStats } from '~/util'

const Sidebar = (props) => {
  const { className, ...rest } = props
  const router = useRouter()
  const classes = classnames(className)

  function getUrl(key) {
    return `/visualization/stat-distribution-per-type/${key}`
  }

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Header>Menu</Card.Header>

        <ListGroup variant="flush" className="border-top-0">
          {getStats().map((stat) => (
            <Link
              href="/visualization/stat-distribution-per-type/[id]"
              as={getUrl(stat.key)}
              passHref
              key={stat.key}
            >
              <ListGroup.Item
                className="cursor-pointer"
                active={getUrl(stat.key) === router.asPath}
              >
                {stat.name} Distribution
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </Card>
    </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.any,
}

export default Sidebar
