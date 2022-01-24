import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import FoodSteps from '../components/FoodSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [province, setProvince] = useState(shippingAddress.province)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, province, postalCode }))
        history.push('/foodpayment')
    }

    return <FormContainer>
        <FoodSteps step1 step2 />
        <h2>Shipping</h2>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='province'>
                <Form.Label>Province</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your province'
                    value={province}
                    required
                    onChange={(e) => setProvince(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <br />
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen
