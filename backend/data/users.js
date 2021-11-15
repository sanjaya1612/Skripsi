import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Sanjaya',
        email: 'sanjaya@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Nicholas',
        email: 'nicholas@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users