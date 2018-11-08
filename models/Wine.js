const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getPrice = num => {
    return (num / 100).toFixed(2);
}

const setPrice = num => {
    return num * 100;
}

// Create Schema
const WineSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    wineName: {
        type: String,
        required: true
    },
    winery: {
        type: String,
        required: true
    },
    wineType: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    varietal: {
        type: [String],
        required: true
    },
    tasteDate: {
        type: Date
    },
    tasteLocation: {
        type: String
    },
    rating: {
        type: Number
    },
    alcoholContent: {
        type: Number
    },
    price: {
        type: Number,
        get: getPrice,
        set: setPrice
    },
    vintage: {
        type: Number,
    },
    wineImage: {
        // data: Buffer, 
        // contentType: String
        type: String
    }
});

module.exports = Wine = mongoose.model('wine', WineSchema);