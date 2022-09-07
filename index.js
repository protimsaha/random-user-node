const express = require('express');
const app = express()
const port = 5000;
const cors = require('cors');
const userRoutes = require('./routes/v1/user.routes')

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', userRoutes)



app.get('/', (req, res) => {
    res.send('Server is running')
})
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

// process.on('unhandledRejection', (error) => {
//     console.log(error.name, error.message)
//     app.close(() => {
//         process.exit(1)
//     })
// })