import React from 'react'
import { Row, Col, Container, Image, Carousel } from 'react-bootstrap'
import TopActivities from '../components/TopActivities'
import TopFoods from '../components/TopFoods'
import VideoJS from '../components/VideoJS'

const HomeScreen = () => {
    
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
                        <>“Life is either a daring adventure or nothing at all” ~ Helen Keller</>
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
                        <>“Take only memories, leave only footprints” ~ Chief Seattle</>
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
                        {/* <h3>Third slide label</h3> */}
                        <>” The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.” ~ Marcel Proust</>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
                <br />
                <h2>What We Serve</h2>
                <h3>Top Values For You...</h3>
                <br />
                <Row>
                    <Col xs={6} md={4}>
                        <Image src='/images/decide.svg' rounded width={200} />
                        <h3 style={{ textAlign: 'center' }}>Lot of choices</h3>
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src='/images/booking.svg' rounded width={200} />
                        <h3 style={{ textAlign: 'center' }}>Easy booking</h3>
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src='/images/secure.svg' rounded width={200} />
                        <h3 style={{ textAlign: 'center' }}>Trusted</h3>
                    </Col>
                </Row>
                <br />
            </Container>
            <br />
            <Row>
                <h2 style={{ textAlign: 'center' }}>About Us</h2>
                <Col>
                    <p style={{ textAlign: 'center' }}>Travel.id is a platform to make it easier for tourists to choose tourist destinations,
                        besides that we also provide a gallery feature to see what tours are in an area of Indonesia,
                        there is also a food feature to be able to buy food from an area and send it to you.</p>
                </Col>
            </Row>
            <br />
            <Row>

                <h2>Let's Explore The Beauty of Indonesia</h2>
                <Col>
                    <br/>
                    <VideoJS />
                    <br/>
                </Col>
            </Row>
            <Container>

            </Container>
            <br />
            <TopActivities />

            <br />
            <TopFoods />

            
        </>
    )
}

export default HomeScreen