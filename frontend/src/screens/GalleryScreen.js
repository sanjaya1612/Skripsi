import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listGalleries } from '../actions/galleryActions'
import { Row, Col, Card, Carousel } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Gallery from '../components/Gallery'
import GallerySearch from '../components/GallerySearch'
import { Link } from 'react-router-dom'
import HotelSearch from '../components/HotelSearch'

const GalleryScreen = () => {
  const dispatch = useDispatch()

  const galleryList = useSelector(state => state.galleryList)
  const { loading, error, galleries } = galleryList

  useEffect(() => {
    dispatch(listGalleries())
  }, [dispatch])
  return (
    <>
      <Carousel>
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
      <h1>Destination Choice</h1>


      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/bali'}>
              <Card.Img src='images/bali123.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/sulawesi'}>
              <Card.Img src='images/sulawesi.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/papua'}>
              <Card.Img src='images/papua.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/ntt'}>
              <Card.Img src='images/ntt.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
      </Row>


      <h1>Gallery <i className="far fa-images"></i></h1>
      <br />
      <GallerySearch />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {galleries.map(gallery => (
            <Col key={gallery._id} sm={12} md={6} lg={4} xl={3}>
              <br />
              <Gallery gallery={gallery} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default GalleryScreen; 
