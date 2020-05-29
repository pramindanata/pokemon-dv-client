import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
// import styles from './index.module.css'

const Error = (props) => {
  const { className, data, ...rest } = props
  const { status, body } = data
  const classes = classnames(className)

  function get422Messages(body) {
    return Object.keys(body).map((key) => {
      return body[key].join('. ') + '.'
    })
  }

  return (
    <div className={classes} {...rest}>
      <Card border="danger">
        <Card.Header>
          <Card.Title className="mb-0">Error: Code {status}</Card.Title>
        </Card.Header>
        <Card.Body>
          {status === 422 ? (
            <>
              <div>
                <strong>Source</strong>: <i>{body.source}</i>.
              </div>
              <div>
                <strong>Detail</strong>:
                <ul className="mb-0">
                  {get422Messages(body.data).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div>
              <p className="mb-0">{body.message}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

Error.propTypes = {
  className: PropTypes.any,
  data: PropTypes.object.isRequired,
}

export default Error
