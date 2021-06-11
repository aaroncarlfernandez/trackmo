import {Navbar, Nav} from 'react-bootstrap'
import Link from 'next/link'

export default () => {
    return (
        <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
            <Link href="/register">
                <a className="nav-link">Register</a>
            </Link>
        </Navbar>
    )
}