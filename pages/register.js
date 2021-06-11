import {Form, Button, Container } from 'react-bootstrap'

export default function Register() {

    return (
        <Container className="mt-5">
            <h1 className="mt-5">Register Page</h1>
            <Form>
                <Form.Group>
                    <Form.Label>First Name: </Form.Label>
                    <Form.Control type="text" placeholder="Insert first name here" required/> 
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control type="text" placeholder="Insert last name here" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Insert email here" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Mobile Number: </Form.Label>
                    <Form.Control type="Number" placeholder="Insert mobile number here" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="Insert password here" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm password: </Form.Label>
                    <Form.Control type="password" placeholder="Confirm password here" />
                </Form.Group>

                <Button variant="success" type="submit" className="mt-3">Submit</Button>
            </Form>
        </Container>


    )
}