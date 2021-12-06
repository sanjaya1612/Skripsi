import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import { listProductDetails } from '../actions/productActions'

const ActivityPlaceOrderScreen = (match) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { product } = productDetails
    const cart = useSelector((state) => state.cart)
    const activityPlaceOrderHandler = () => {
        console.log('order')
    }
    useEffect(() => {
        dispatch(listProductDetails(localStorage.getItem("PId")))
    }, [dispatch, match])   

    //calculation
    cart.itemPrice = Number(localStorage.Qty * product.price)
    cart.taxPrice = Number((0.10 * cart.itemPrice))
    cart.totalPrice = Number((localStorage.Qty * product.price) + cart.taxPrice)

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

                        <ListGroup.Item>
                            <h2>Order Details</h2>
                            <Row>
                                <Col md={2}>
                                    <Image src={product.image} alt={""} width={100} rounded />
                                </Col>
                                <Col>
                                    <Link to={`/product/${product.product}`}>
                                        {product.name}
                                    </Link>
                                </Col>
                                <Col md={5}>
                                    {localStorage.Qty} x Rp.{product.price} = Rp.{localStorage.Qty * product.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Sumamary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rp.{localStorage.Qty * product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rp.{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rp.{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='w-100' onClick={activityPlaceOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ActivityPlaceOrderScreen
