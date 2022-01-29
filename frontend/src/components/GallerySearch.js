import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const GallerySearch = ({ history }) => {
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search-gallery/${keyword}`)
        } else {
            history.push('/gallery')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search by location'
                className='gsbox'>
            </Form.Control>
            <Button type='submit' variant='outline-success'><i className="fas fa-search"></i></Button>
        </Form>
    )
};

export default GallerySearch;
