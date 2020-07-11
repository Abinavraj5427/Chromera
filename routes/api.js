const express = require('express');
const router = express.Router();

const Data = require('../models/data');
const e = require('express');

//get data
router.get('/data', (req, res, next) => {
    Data.find({'hash': req.body.hash},function(err, data){
        res.json(data);
    });
});

//add data
router.post('/data', (req, res, next) => {
    console.log(req.body);
    let newData = new Data({
        hash: req.body.hash,
        base_salary: req.body.base_salary,
        percent_raise: req.body.percent_raise,
        target_bonus: req.body.target_bonus,
        four_yr_RSU: req.body.four_yr_RSU,
        vest_percent: req.body.vest_percent,
    });

    newData.save((err, data) => {
        if(err)res.json({msg: 'Failed to add contact'});
        else res.json({msg: 'Data added successfully'});
    })
});

module.exports = router;