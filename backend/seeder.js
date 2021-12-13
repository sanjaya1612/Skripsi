import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import foods from './data/foods.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Foods from './models/foodModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Foods.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleFoods = foods.map(food => {
            return { ...food, user: adminUser }
        })

        await Foods.insertMany(sampleFoods)

        console.log('Data Imported')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}