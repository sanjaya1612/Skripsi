import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderFoodRoutes from './routes/orderFoodRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())


app.use('/api/products', productRoutes)
app.use('/api/foods', foodRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/galleries', galleryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/orderfoods', orderFoodRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.use(favicon(__dirname + '/public/favicon.ico'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend',
        'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.use(notFound)

app.use(errorHandler)

// app.listen(process.env.PORT || 5000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))