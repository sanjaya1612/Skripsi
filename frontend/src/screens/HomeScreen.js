import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Image, Carousel } from 'react-bootstrap'
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
            <Container> <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded"
                        style={{ height: 400 }}
                        src="/images/1.jpg?text=First slide&bg=373940"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded"
                        style={{ height: 400 }}
                        src="/images/2.jpg?text=Second slide&bg=282c34"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded"
                        style={{ height: 400 }}
                        src="/images/3.jpg?text=Third slide&bg=20232a"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
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