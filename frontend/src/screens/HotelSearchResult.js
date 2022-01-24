import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import { Link } from "react-router-dom"
import { Col } from 'react-bootstrap'
import HotelSearch from '../components/HotelSearch'
import Hotel from '../components/Hotel'
import { searchListings } from '../actions/hotelActions'

const HotelSearchResult = () => {
    const [searchLocation, setSearchLocation] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchBed, setSearchBed] = useState("");
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const { location, date, bed } = queryString.parse(window.location.search);
        // console.table({ location, date, bed });
        searchListings({ location, date, bed }).then((res) => {
            console.log("SEARCH RESULTS ===>", res.data);
            setHotels(res.data);
        });
    }, [window.location.search]);
    return (
        <>
            <div className="col">
                <br />
                <HotelSearch />
            </div>
            <div className="container">
                <div className="row">
                    {hotels.map((hotel) => (
                        <Col key={hotel._id} sm={12} md={6} lg={4} xl={3}>
                            <br />
                            <Hotel hotel={hotel} />
                        </Col>
                    ))}
                </div>
            </div>
        </>
    )
};

export default HotelSearchResult;
