import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const HotelSearch = ({history}) => {
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){ 
            history.push(`/search-hotel/${keyword}`)
        }else{
            history.push('/hotels')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search by location'
                        className='sbox'>
                    </Form.Control>
                </Col>
                <Col>
                    <Button type='submit' variant='outline-success' className='cari'><i className="fas fa-search"></i></Button>
                </Col>
            </Row>
        </Form>
    )
};

export default HotelSearch;
