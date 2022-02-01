import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const DateFoodFilter = ({ history }) => {
    const [keydate, setKeydate] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keydate) {
            history.push(`/datefilter/${keydate}`)
        } else {
            history.push('/admin/foodorderlist')
        }
    }
    return (
        <>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col>
                        <Form.Control
                            type='text'
                            name='q'
                            onChange={(e) => setKeydate(e.target.value)}
                            placeholder='Search by username'
                            className='datefilter'>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Button type='submit' className='caritanggal'><i className="fas fa-search"></i></Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
};

export default DateFoodFilter;
