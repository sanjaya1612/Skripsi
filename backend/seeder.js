import mongoose from 'mongoose'
import dotenv from 'dotenv'
import gallery from './data/gallery.js'
import users from './data/users.js'
import Gallery from './models/galleryModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Gallery.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleGalleries = gallery.map(gallery => {
            return { ...gallery, user: adminUser }
        })

        await Gallery.insertMany(sampleGalleries)

        console.log('Data Imported')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await Hotel.deleteMany()

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