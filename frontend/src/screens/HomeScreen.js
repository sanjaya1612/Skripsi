import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Image } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <Container>
                <h1>What We Serve</h1>
                <h2>Top Values For You...</h2>
                <br />
                <Row>
                    <Col xs={6} md={4}>
                        <Image src='/images/decide.svg' rounded width={200} />
                        <h2 style={{ textAlign: 'center' }}>Lot of choices</h2>
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src='/images/booking.svg' rounded width={200} />
                        <h2 style={{ textAlign: 'center' }}>Easy booking</h2>
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src='/images/secure.svg' rounded width={200} />
                        <h2 style={{ textAlign: 'center' }}>Trusted</h2>
                    </Col>
                </Row>
                <br />
            </Container>
            <Row>
                <h2 style={{ textAlign: 'center' }}>About Us</h2>
                <Col>
                    <p style={{ textAlign: 'center' }}>Travel.id is a platform to make it easier for tourists to choose tourist destinations,
                        besides that we also provide a gallery feature to see what tours are in an area of Indonesia,
                        there is also a food feature to be able to buy food from an area and send it to you.</p>
                </Col>
            </Row>
            <Container>

            </Container>
            <h1>Favorite Activities</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen