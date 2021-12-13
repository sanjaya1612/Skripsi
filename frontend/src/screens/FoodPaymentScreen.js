import React, { useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import FoodSteps from '../components/FoodSteps'

const FoodPaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress) {
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('BCA bank transfer')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/foodplaceorder')
    }
    return (
        <FormContainer>
            <FoodSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='BCA bank transfer'
                        id='Bca'
                        name='paymentMethod'
                        value='Bca'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
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

export default FoodPaymentScreen
