import { prisma } from '../utils/prismaClient.js'

export const addUser = async (req, res) => {
  const {
    email,
    name,
    age,
    gender,
    address,
    userType,
    highestEducation,
    phoneNumber
  } = req.body
  console.log(
    email,
    name,
    age,
    gender,
    address,
    userType,
    highestEducation,
    phoneNumber
  )
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        age: +age,
        gender,
        address,
        type: userType,
        highestEducation,
        phone: +phoneNumber
      }
    })
    console.log(newUser, 'newUser')
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add user' })
  }
}

export const getUser = async (req, res) => {
  console.log('req received')
  const { email } = req.query
  console.log(email, 'email')
  try {
    const user = await prisma.user.findUnique({
      where: { email: email }
    })
    if (user) {
      console.log(user, 'user')
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to retrieve user' })
  }
}
// export const update
