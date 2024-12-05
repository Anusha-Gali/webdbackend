const mongoose = require('mongoose');

const PetListingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    animalType: { type: String, required: true, enum: ['dog', 'cat', 'rabbit', 'bird', 'reptile', 'other'] },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    sex: { type: String, required: true, enum: ['male', 'female'] },
    colour: { type: String, required: true },
    imageURL: { type: String }, 
    comments: [{
        userId: { type: String },
        name: { type: String },
        comment: { type: String }
    }],
    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    userListed: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approved: { type: Boolean, default: false },
    adoptedStatus: { type: Boolean, default: false }, 
    adoptedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('PetListing', PetListingSchema);