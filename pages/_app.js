import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'

import AppNavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppNavBar />
      <Container> 
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default MyApp
