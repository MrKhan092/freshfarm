const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// POST /cart/add/:id => Add product to cart
router.post('/add/:id', async (req, res) => {
    try {
        const product = await Listing.findById(req.params.id);
        if (!product) {
            req.flash("error", "Product not found");
            return res.redirect("/listings");
        }

        // Initialize cart if not exists
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if already in cart
        const existingItem = req.session.cart.find(item => item._id.toString() === product._id.toString());
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            req.session.cart.push({
                _id: product._id.toString(),
                productName: product.productName,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        req.flash("success", "Added to cart!");
        res.redirect("back"); // redirect to previous page
    } catch (err) {
        console.error("Cart Add Error:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
});

module.exports = router;

