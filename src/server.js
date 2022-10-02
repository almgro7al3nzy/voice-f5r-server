require('dotenv').config()
const express = require('express')
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()
const PORT = process.env.PORT || 5000
DbConnect();

app.use(cookieParser());
const corsOption = { origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true, };
app.use(cors(corsOption));
app.use('/storage', express.static('storage'))

app.use(express.json({ limit: '8mb' }));
app.use(router)
app.get('/', (req, res) => {
    res.send("Hello Worlcd")
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));