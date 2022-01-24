import React, { useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/bookingActions'
import FoodSteps from '../components/FoodSteps'

const HotelPaymentScreen = ({ history }) => {
    const booking = useSelector((state) => state.booking)
    const { bookingHotel } = booking
    if (!bookingHotel) {
        history.push('/bookinghotel')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/hotelplaceorder')
    }
    return (
        <FormContainer>
            <FoodSteps step1 step2 step3 />
            <h2>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    {/* <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check> */}
                </Col>
                </Form.Group>
                <br />
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default HotelPaymentScreen
