import { Container } from 'react-bootstrap'
import styles from './index.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light">
      <Container className="text-center py-4">
        <div>
          <span className={styles.copyright}>&copy;</span> {year} cool_snek
        </div>
        <div className="text-sm text-muted">
          Developed by <span>Eksa Pramindanata</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
