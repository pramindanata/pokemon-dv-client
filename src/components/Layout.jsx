import PropTypes from 'prop-types'

import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div>
      <Nav />
      <main className="flex-fill">{props.children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
