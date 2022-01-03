import React, { useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FoodSteps from '../components/FoodSteps'
import Message from '../components/Message'
import { createFoodOrder } from '../actions/oderFoodActions'


const FoodPlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    //calculation

    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = Number(cart.itemsPrice > 500000 ? 0 : 10000)
    cart.taxPrice = Number((0.1 * cart.itemsPrice))
    cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice + cart.taxPrice)

    const orderFoodCreate = useSelector((state) => state.orderFoodCreate)
    const {order, success} = orderFoodCreate

    useEffect(() => {
         if (success){
             console.log('Pindah')
             history.push(`/foodorder/${order._id}`)
         }
    }, [history, success])
    const foodPlaceOrderHandler = () => {
        dispatch(createFoodOrder({
            orderItems: cart.cartItems,
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
                            <h2>Shipping</h2>
                            <>
                                <strong>Addres: </strong>
                                {cart.shippingAddress.address},
                                {' '}{cart.shippingAddress.city},
                                {' '}{cart.shippingAddress.province},
                                {' '}{cart.shippingAddress.postalCode}
                            </>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>Rp.{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rp.{cart.shippingPrice}</Col>
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
                                    <Col>Total Price</Col>
                                    <Col>Rp.{cart.totalPrice}</Col>
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
