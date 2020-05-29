import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const GenerationFilter = (props) => {
  const { className, initial, loading, onSubmit, ...rest } = props
  const classes = classnames(className)
  const [generation, setGeneration] = useState(initial || 'all')

  useEffect(() => {
    setGeneration(initial)
  }, [initial])

  function submit(e) {
    e.preventDefault()

    onSubmit(generation)
  }

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Header>Filter</Card.Header>

        <Card.Body className="pb-1">
          <Form onSubmit={submit}>
            <Row>
              <Col md="4" lg="4">
                <Form.Group>
                  <Form.Label>Select Generation</Form.Label>
                  <Form.Control
                    as="select"
                    value={generation}
                    onChange={(e) => setGeneration(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="1">Generation 1</option>
                    <option value="2">Generation 2</option>
                    <option value="3">Generation 3</option>
                    <option value="4">Generation 4</option>
                    <option value="5">Generation 5</option>
                    <option value="6">Generation 6</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm="6" md="4" lg="3">
                <Form.Group>
                  <Form.Label
                    className={classnames(
                      'invisible',
                      styles['filter-btn-label'],
                    )}
                  >
                    action
                  </Form.Label>

                  {!loading ? (
                    <Button variant="primary" block type="submit">
                      Apply
                    </Button>
                  ) : (
                    <Button variant="primary" block disabled>
                      Loading
                    </Button>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

GenerationFilter.propTypes = {
  className: PropTypes.any,
  initial: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default GenerationFilter
