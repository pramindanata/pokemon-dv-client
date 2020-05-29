import { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const Filter = (props) => {
  const { className, onSubmit, loading, initial, ...rest } = props
  const classes = classnames(className)
  const [search, setSearch] = useState(initial.search || '')
  const [orderBy, setOrderBy] = useState(initial.orderBy || 'index')
  const [sortBy, setSortBy] = useState(initial.sortBy || 'asc')
  const [searchPH, setSearchPH] = useState('')

  useEffect(() => {
    const pokemonNames = [
      'Pikachu',
      'Kyogre',
      'Charmeleon',
      'Weedle',
      'Pidgey',
      'Find something',
      'Hmm',
    ]
    const placeholder =
      pokemonNames[Math.floor(Math.random() * pokemonNames.length)]

    setSearchPH(`${placeholder}...`)
  }, [])

  useEffect(() => {
    setSearch(initial.search || '')
    setOrderBy(initial.orderBy || 'index')
    setSortBy(initial.sortBy || 'asc')
  }, [initial])

  function submit(e) {
    e.preventDefault()
    onSubmit({
      search,
      sortBy,
      orderBy,
    })
  }

  return (
    <div className={classes} {...rest}>
      <Form onSubmit={submit}>
        <Row className={styles['filter-wrapper']}>
          <Col sm="6" md="6" lg="3">
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`${searchPH}`}
              />
            </Form.Group>
          </Col>

          <Col sm="6" md="3" lg="3">
            <Form.Group>
              <Form.Label>Order By</Form.Label>
              <Form.Control
                as="select"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="index">Index</option>
                <option value="name">Name</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col sm="6" md="3" lg="3">
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Control
                as="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col sm="6" md="3" lg="3">
            <Form.Group>
              <Form.Label
                className={classnames('invisible', styles['filter-btn-label'])}
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
    </div>
  )
}

Filter.propTypes = {
  className: PropTypes.any,
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Filter
