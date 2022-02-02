import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { listGalleries } from '../actions/galleryActions'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TopCarousel from '../components/TopCarousel'
import DestinationChoice from '../components/DestinationChoice'

const GalleryScreen = () => {
  const dispatch = useDispatch()

 

  useEffect(() => {
    dispatch(listGalleries())
  }, [dispatch])
  return (
    <>
      
      <TopCarousel />
      <DestinationChoice />
      <Link to ='/allgallery'>See More</Link>
      
      <h1>About Indonesia </h1>
      <p>
        Indonesia, also known as the Unitary State of the Republic of Indonesia (NKRI), or simply the Republic of Indonesia (RI) is a country in Southeast Asia which is crossed by the equator and is located between the mainland of Asia and Oceania, 
        and between the Pacific Ocean and the Indian Ocean. Indonesia is the largest archipelagic country in the world consisting of 17,504 islands. 
        The alternative name commonly used is Nusantara. With a population of 270,203,917 in 2020, Indonesia is the fourth most populous country in the world and the most populous Muslim country in the world, with more than 230 million adherents.
      </p>
      <h1>Indoensia Map </h1>
      <Image className='map' src='./images/id.svg' />
      <br />
    </>
  )
}

export default GalleryScreen; 
