import PropTypes from 'prop-types'
import Router from 'next/router'
import NProgress from 'nprogress'
import '~/assets/index.scss'

NProgress.configure({
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default App
