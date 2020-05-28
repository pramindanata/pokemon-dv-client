import NextHead from 'next/head'
import PropTypes from 'prop-types'

const Head = (props) => {
  const { children, title } = props

  return (
    <NextHead>
      <title>{`${title || 'DV'} - PokeDV`}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {children}
    </NextHead>
  )
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default Head
