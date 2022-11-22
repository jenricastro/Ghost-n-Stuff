const mongoose = require('mongoose');

const creaturesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Creature name is required'],
    },
    location:{
        type: String,
        required: [true, 'Add a location'],
    },
    kind:{
        type: String,
        required: [true, 'What kind of creature is it?'],
    },
    description:{
        type: String,
        required: [true, 'Please add a creature description'],
    },
    hostile: Boolean,
    img: String
})

const Creatures = mongoose.model('Creatures', creaturesSchema);
module.exports = Creatures