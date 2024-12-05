const express = require('express');
const PetListing = require('../models/PetListing');

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const totalListings = await PetListing.countDocuments({ approved: true, adoptedStatus: false });
        const totalAdoptions = await PetListing.countDocuments({ adoptedStatus: true });
        const waitingApprovals = await PetListing.countDocuments({ approved: false });

        const animalTypes = await PetListing.aggregate([
            { $match: { approved: true, adoptedStatus: false } },
            { $group: { _id: "$animalType", count: { $sum: 1 } } }
        ]);

        res.json({
            totalListings,
            totalAdoptions,
            waitingApprovals,
            animalTypes
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/adopted', async (req, res) => {
    try {
        const adoptedPets = await PetListing.find({ adoptedStatus: true }).populate('userListed', 'name');
        res.json(adoptedPets);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;