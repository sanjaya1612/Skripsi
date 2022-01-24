import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import HotelSteps from '../components/HotelSteps'
import { saveBookingHotel } from '../actions/bookingActions'

const HotelBookingScreen = ({history}) => {
    const booking = useSelector(state => state.booking)
    const {bookingHotel} = booking

    const [fullName, setFullName] = useState(bookingHotel.fullName)
    const [email, setEmail] = useState(bookingHotel.email)
    const [phoneNumber, setPhoneNumber] = useState(bookingHotel.phoneNumber)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveBookingHotel({fullName, email, phoneNumber}))
        history.push('/hotelpayment')
    }
    return (
        <FormContainer>
            <HotelSteps step1 step2/>
            <h2>Booking</h2>
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
                <br />
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default HotelBookingScreen
