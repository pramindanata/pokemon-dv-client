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

  function getTopUrl(key) {
    return `/visualization/top/${key}`
  }

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Header>Menu</Card.Header>

        <ListGroup variant="flush" className="border-top-0">
          {getStats().map((stat) => (
            <Link
              href="/visualization/top/[id]"
              as={getTopUrl(stat.key)}
              passHref
              key={stat.key}
            >
              <ListGroup.Item
                className="cursor-pointer"
                active={getTopUrl(stat.key) === router.asPath}
              >
                Top {stat.name}
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
