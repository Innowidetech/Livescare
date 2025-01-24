const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const memberRoute = require('./routes/member.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());




app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/member', memberRoute);


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connect to database.'))
  .catch((err) => console.log('Error connecting to database', err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running at port: ' + port)
});
