const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
 const Chatkit = require('@pusher/chatkit-server')

const app = express()

 const chatkit = new Chatkit.default({
   instanceLocator: 'v1:us1:d3dd1f58-970c-4b75-b1ec-934808c88418',
   key: 'd665fdff-2c31-45ab-943c-c1e13d7d09b3:JvVXfBLODvyhXC5G4Cfwrnkl5hGGzrhLlcJxGTSb0ww=',
 })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

 app.post('/users', (req, res) => {
   const { username } = req.body
   chatkit
     .createUser({
       id: username,
       name: username
     })
     .then(() => res.sendStatus(201))
     .catch(error => {
       if (error.error_type === 'services/chatkit/user_already_exists') {
         res.sendStatus(200)
       } else {
         res.status(error.status).json(error)
       }
     })
 })

 app.post('/authenticate', (req, res) => {
   const authData = chatkit.authenticate({ userId: req.query.user_id })
   res.status(authData.status).send(authData.body)
 })


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
