const functions = require("firebase-functions");

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51K4xlABcYwuxvd1JjLSoaILwSteSIa66fS4DvIJQfPl8r51jJyflusWPeaMLN1JwyGdMSeCn8xV0xeSNKiLWVAy300F46rDTaA';
let currentUser = {};
let customerData = {};

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
    // Stripe init here
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "",
        cancel_url: "",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "usd",
                    unity_amount: (100) * 100, // 100.00
                    product_data: {
                        name: "Item Name"
                    }
                }
            }
        ]
    });
})