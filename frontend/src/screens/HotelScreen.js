import React, {useEffect} from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listHotels } from '../actions/hotelActions'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Hotel from '../components/Hotel'
import HotelSearch from '../components/HotelSearch'

const HotelScreen = ({match}) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()

    const hotelList = useSelector(state => state.hotelList)
    const {loading, error, hotels} = hotelList

    useEffect(() => {
        dispatch(listHotels(keyword))
    },[dispatch, keyword])
    return (
        <>
            <h1>Hotels <i className="fas fa-hotel"></i></h1>
            <br/>
            <Route render={({ history }) => <HotelSearch history={history}/>}/>
                 

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {hotels.map(hotel => (
                        <Col key={hotel._id} sm={12} md={6} lg={4} xl={3}>
                            <br/>
                            <Hotel hotel={hotel} />
                        </Col>
                    ))}
                </Row>
            )} 
        </>
    )
}

export default HotelScreen
