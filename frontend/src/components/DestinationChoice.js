import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const destinationChoice = () => {
    return (
        <>
            <Card className='mb-3' style={{ width: '17rem' }}>
                <Link to={'/gallery/bali'}>
                    <Card.Img src='.images/1.jpg' width={110} height={200} />
                </Link>
            </Card>
            <Card className='mb-3' style={{ width: '17rem' }}>
                <Link to={'/gallery/sulawesi'}>
                    <Card.Img src='.images/1.jpg' width={110} height={200} />
                </Link>
            </Card>
            <Card className='mb-3' style={{ width: '17rem' }}>
                <Link to={'/gallery/NTT'}>
                    <Card.Img src='.images/1.jpg' width={110} height={200} />
                </Link>
            </Card>
            <Card className='mb-3' style={{ width: '17rem' }}>
                <Link to={'/gallery/bali'}>
                    <Card.Img src='.images/1.jpg' width={110} height={200} />
                </Link>
            </Card>
        </>

    )
}

export default destinationChoice
