import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User 2',
        email: 'admin2@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
]

export default users