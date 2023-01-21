const express = require('express')
const cors = require('cors')
const dbconn = require('./dbcon')

const app = express()

app.use(cors())
app.use(express.json())

const userRoutes = require('./auth-routes')
app.use('/auth', userRoutes)

dbconn.connect(error => {
  if (error) {
    console.log(error)
    // process.exit(1);
  } else {
    console.log('Connected to database')
  }
})

app.listen(8080, () => {
  console.log(`Listening on port 8080`)
})
