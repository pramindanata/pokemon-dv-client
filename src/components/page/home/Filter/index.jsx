import { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const Filter = (props) => {
  const { className, onSubmit, ...rest } = props
  const classes = classnames(className)
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('index')
  const [sort, setSort] = useState('asc')
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

  function submit(e) {
    e.preventDefault()
    onSubmit({
      search,
      sort,
      order,
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
                placeholder={`${searchPH}...`}
              />
            </Form.Group>
          </Col>

          <Col sm="6" md="3" lg="3">
            <Form.Group>
              <Form.Label>Order By</Form.Label>
              <Form.Control
                as="select"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="asc">Index</option>
                <option value="desc">Name</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col sm="6" md="3" lg="3">
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Control
                as="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
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
              <Button variant="primary" block type="submit">
                Apply
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

Filter.propTypes = {
  className: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
}

export default Filter
