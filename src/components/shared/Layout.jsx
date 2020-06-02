import PropTypes from 'prop-types'

import Nav from '~/components/shared/Nav'
import Footer from '~/components/shared/Footer'

const Layout = (props) => {
  return (
    <>
      <Nav />
      <main className="flex-fill">{props.children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
