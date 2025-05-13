import mongoose from 'mongoose';
const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    shop_address: {
        type: String,
        required: true,
        trim: true,
    },
    product_category: {
        type: String,
        trim: true,
        required: true
    },
    product_price: {
        type: mongoose.Decimal128,
        required: true,
        validate: (value) => value >= 499
    },
    // created_at : {
    //     type: Date,
    //     default: Date.now
    // },
});
const shopModel = mongoose.model('shop', shopSchema);

export default shopModel;
