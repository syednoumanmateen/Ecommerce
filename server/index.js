const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./routes/user.route")
const brandRoute = require("./routes/brand.route")
const cartRoute = require("./routes/cart.route")
const categoryRoute = require("./routes/category.route")
const patternTypeRoute = require("./routes/patternType.route")
const productRoute = require("./routes/product.route")
const shopRoomRoute = require("./routes/shopRoom.route")
const whishlistRoute = require("./routes/wishlist.route")

mongoose.connect(process.env.MONGOURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Ecommerce API');
});

app.use('/api/user', userRoute);
app.use('/api/brand', brandRoute);
app.use('/api/cart', cartRoute);
app.use('/api/category', categoryRoute);
app.use('/api/pattern-type', patternTypeRoute);
app.use('/api/product', productRoute);
app.use('/api/shop-room', shopRoomRoute);
app.use('/api/whishlist', whishlistRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});