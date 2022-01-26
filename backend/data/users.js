import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User 3',
        email: 'admin3@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
]

export default users