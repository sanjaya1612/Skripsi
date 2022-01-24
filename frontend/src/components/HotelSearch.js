import React, { useState } from 'react';
import AlgoliaPlaces from 'algolia-places-react'
import { DateRangePicker, InputPicker, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useHistory } from 'react-router-dom';



const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: "en",
    countries: ["id"],
}

const HotelSearch = () => {
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [bed, setBed] = useState('')

    //route
    const history = useHistory()

    const handleSubmit = () => {
        history.push(`/search-hotel?location=${location}&date=${date}&bed=${bed}`)
    }
 
    const options = [{
        "label": 1,
        "value": 1,
    },
    {
        "label": 2,
        "value": 2,
    },
    {
        "label": 3,
        "value": 3,
    },
    {
        "label": 4,
        "value": 4,
    },
    ]
    
    

    return (
        <div className='d-flex pb-4'>
            <div className='w-100'>
                <AlgoliaPlaces
                    placeholder='Loaction'
                    defaultValue={location}
                    options={config}
                    onChange={({ suggestion }) => setLocation(suggestion.value)}
                    style={{ height: "42px" }}
                />
            </div>
                <DateRangePicker size="lg" onChange={(dateString) => setDate(dateString)} className='w-100'/>
                <InputPicker onChange={(value) => setBed(value)} size="lg" placeholder="Number of beds" className='w-100' style={{ height: "42px" }} data={options} />
                <Button onClick={handleSubmit} appearance="subtle" className='carihotel'><i className="fas fa-search"></i></Button>
        </div>
    )
};

export default HotelSearch;
