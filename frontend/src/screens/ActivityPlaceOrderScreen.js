import React, { useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'

const ActivityPlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Booking</h2>
                            <p>
                                <strong>Name: </strong>
                                {cart.booking.fullName}
                            </p>
                            <p>
                                <strong>E-mail: </strong>
                                {cart.booking.email}
                            </p>
                            <p>
                                <strong>Phone number: </strong>
                                {cart.booking.phoneNumber}
                            </p>
                            <p>
                                <strong>Date: </strong>
                                {localStorage.getItem("Date")}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                            <h2>Order</h2>
                            <Col md={1}>
                                <Image src={""} alt={""} fluid rounded />
                            </Col>
                        </ListGroup.Item> */}
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default ActivityPlaceOrderScreen
