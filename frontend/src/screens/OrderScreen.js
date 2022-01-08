import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'


const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()


    const OrderDetails = useSelector(state => state.OrderDetails)
    const { order, loading, error } = OrderDetails

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                            <h2>Booking</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.booking.fullName}
                            </p>
                            <p>
                                <strong>E-mail: </strong>
                                {order.booking.email}
                            </p>
                            <p>
                                <strong>Phone number: </strong>
                                {order.booking.phoneNumber}
                            </p>
                            <p>
                                <strong>Date: </strong>
                                {localStorage.getItem("Date")}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>No Order</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    {item.name}
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x Rp.{item.price} = Rp.{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rp.{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rp.{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rp.{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>Rp.{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>
}

export default OrderScreen
