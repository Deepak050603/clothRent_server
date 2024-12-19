
const express = require('express')

const cors = require('cors')

require('dotenv').config()
 
require('./connection')

const router = require('./routes')

const clothServer = express()

clothServer.use(cors())


clothServer.use(express.json())

clothServer.use(router)

clothServer.use('/upload',express.static('./uploads'))


const PORT = 4000 || process.env.PORT

clothServer.listen(PORT,()=>{
    console.log('server running succesfully');
    
})

