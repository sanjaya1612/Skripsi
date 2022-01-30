import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listGalleries } from '../actions/galleryActions'
import { Image } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Gallery from '../components/Gallery'
import GallerySearch from '../components/GallerySearch'
import { Link } from 'react-router-dom'
import TopCarousel from '../components/TopCarousel'
import DestinationChoice from '../components/DestinationChoice'

const GalleryScreen = ({ match }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const galleryList = useSelector(state => state.galleryList)
  const { loading, error, galleries } = galleryList

  useEffect(() => {
    dispatch(listGalleries(keyword))
  }, [dispatch])
  return (
    <>
      {/* {!keyword && <TopCarousel />} */}
      <TopCarousel />
      <DestinationChoice />
      <Link to ='/allgallery'>See More</Link>
      {/* {!keyword && <DestinationChoice />} */}
      <h1>About Indonesia </h1>
      <p>
        Indonesia, also known as the Unitary State of the Republic of Indonesia (NKRI), or simply the Republic of Indonesia (RI) is a country in Southeast Asia which is crossed by the equator and is located between the mainland of Asia and Oceania, 
        and between the Pacific Ocean and the Indian Ocean. Indonesia is the largest archipelagic country in the world consisting of 17,504 islands. 
        The alternative name commonly used is Nusantara. With a population of 270,203,917 in 2020, Indonesia is the fourth most populous country in the world and the most populous Muslim country in the world, with more than 230 million adherents.
      </p>
      <h1>Indoensia Map </h1>
      <Image className='map' src='./images/id.svg' />
      <br />
      {/* <Route render={({ history }) => <GallerySearch history={history} />} />

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
      )} */}
    </>
  )
}

export default GalleryScreen; 
