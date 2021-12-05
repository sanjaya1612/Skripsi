import React, { useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { saveBooking } from '../actions/cartActions'

const ShippingScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const { booking } = cart

    const[fullName, setFullName] = useState(booking.fullName)
    const[email, setEmail] = useState(booking.email)
    const[phoneNumber, setPhoneNumber] = useState(booking.phoneNumber)

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveBooking({fullName, email, phoneNumber}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2/>
            <h1>Booking</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='fullName'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your full name'
                        value={fullName}
                        required
                        onChange={(e) => setFullName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your phone number'
                        value={phoneNumber}
                        required
                        onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
