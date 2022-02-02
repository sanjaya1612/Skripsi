import React, { useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FoodSteps from '../components/FoodSteps'
import Message from '../components/Message'
import { createFoodOrder } from '../actions/oderFoodActions'
import NumberFormat from 'react-number-format'


const FoodPlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    //calculation

    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = Number(cart.itemsPrice > 500000 ? 0 : 10000)
    cart.taxPrice = Number((0.1 * cart.itemsPrice))
    cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice + cart.taxPrice)

    const orderFoodCreate = useSelector((state) => state.orderFoodCreate)
    const { order, success } = orderFoodCreate

    useEffect(() => {
        if (success) {
            history.push(`/foodorders/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])
    const foodPlaceOrderHandler = () => {
        dispatch(createFoodOrder({
            orderItems: cart.cartItems,
            fullName: localStorage.getItem("FullName"),
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            <FoodSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <>
                                <strong>Name : </strong>
                                {localStorage.getItem("FullName")}
                                <br/>
                                <strong>Addres: </strong>
                                {cart.shippingAddress.address},
                                {' '}{cart.shippingAddress.city},
                                {' '}{cart.shippingAddress.province},
                                {' '}{cart.shippingAddress.postalCode}
                            </>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} width={100} fluid rounded />
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
                                    <Col><NumberFormat
                                        value={cart.itemsPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col><NumberFormat
                                        value={cart.shippingPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col><NumberFormat
                                        value={cart.taxPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col><NumberFormat
                                        value={cart.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <br />
                    <Button
                        type='button'
                        className='w-100'
                        onClick={foodPlaceOrderHandler}
                    >Place Order</Button>
                </Col>
            </Row>
        </>
    )
}

export default FoodPlaceOrderScreen
