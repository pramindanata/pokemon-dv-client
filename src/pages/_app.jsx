import PropTypes from 'prop-types'
import '~/assets/index.scss'

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default App
