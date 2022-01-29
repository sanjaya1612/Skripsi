import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader'
import Message from './Message' 
import { listTopGalleries } from '../actions/galleryActions';

const TopCarousel = () => {

    const dispatch = useDispatch()

    const galleryTopRated = useSelector(state => state.galleryTopRated)
    const{ loading, error, galleries }  = galleryTopRated
    
    useEffect(() => {
        dispatch(listTopGalleries())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='bg-light'>
            {galleries.map(gallery => (
                <Carousel.Item key={gallery._id}>
                    <Link to={`/gallery/${gallery._id}`}>
                    <img
                        className="d-block w-100 rounded"
                        style={{ height: 450 }}
                        src={gallery.image}
                        alt="First slide"
                    />
                        {/* <Image src={gallery.image} alt={gallery.name} fluid/>  */}
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{gallery.name}</h2>
                            <h2><i class="fas fa-map-marker-alt"></i>{" "}{gallery.location}</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )

};

export default TopCarousel;
