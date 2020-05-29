import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const {
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    initialPage,
    forcePage,
    onPageChange,
  } = props

  return (
    <ReactPaginate
      onPageChange={onPageChange || undefined}
      breakLabel="..."
      breakClassName="btn btn-outline"
      containerClassName="btn-group px-0"
      pageClassName="btn btn-outline-primary p-0"
      pageLinkClassName="btn"
      activeClassName="btn btn-outline-primary active"
      nextLinkClassName="btn"
      nextClassName="btn btn-outline-primary ml-2 p-0"
      previousLinkClassName="btn"
      previousClassName="btn btn-outline-primary mr-2 p-0"
      forcePage={forcePage || 0}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed || 3}
      marginPagesDisplayed={marginPagesDisplayed || 3}
      initialPage={initialPage || 0}
      disableInitialCallback={true}
    />
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
  initialPage: PropTypes.number,
  forcePage: PropTypes.number,
  onPageChange: PropTypes.func,
}

export default Pagination
