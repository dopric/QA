const auth = require('basic-auth')
const bcryptjs = require('bcryptjs')
const db = require('../db')
const UserModel = require('../models/user')

const authenticateUser = (req, res, next) => {
	console.log('Autheniticate users middleware')
	let message = null
	const credentials = auth(req)

	if (credentials) {
		UserModel.findOne({ name: credentials.name })
			.then(function(user) {
				// console.log('User found', user)
				console.log('compare', credentials.name, user.name)
				const authenicated = bcryptjs.compareSync(credentials.pass, user.password)
				if (authenicated) {
                    // append user tu req so it can be evaluated
                    console.log("user Authenicated")
                    req.currentUser = {name: user.name, createdDate: user.createdDate}
                   next()
				} else {
                    message = 'Authentication failed'
                    res.status(401).json(
                        { 
                            message: 'Zugriff verweigert',
                        reason: 'Invalid credentials' 
                    })
				}
			})
			.catch((err) => {
                res.status(401).json(
                    { 
                        message: 'Zugriff verweigert',
                    reason: 'User not found' 
                })
			})
	} else {
		res.status(401).json(
            { 
                message: 'Zugriff verweigert',
                reason: 'Authentication header not provided' 
        })
	}

}

module.exports = { authenticateUser }
