const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./routes/user.route")
const cartRoute = require("./routes/cart.route")
const productRoute = require("./routes/product.route")
const whishlistRoute = require("./routes/wishlist.route")

mongoose.connect(process.env.MONGOURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Ecommerce API');
});

app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute);
app.use('/api/product', productRoute);
app.use('/api/wishlist', whishlistRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});