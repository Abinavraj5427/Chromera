const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    hash: {
        type: String,
        required: true,
    },
    base_salary: {
        type: Number,
        required: false,
    },
    percent_raise:{
        type: Number,
        required: false,
    },
    target_bonus:{
        type: Number,
        required: false,
    },
    four_yr_RSU:{
        type: Number,
        required: false,
    },
    vest_percent:{
        type: Number,
        required: false,
    }
});

const Data = module.exports = mongoose.model('Data', DataSchema);