const express = require('express');
const router = express.Router();
const axios = require('axios');

const Data = require('../models/data');

async function getUniqueUrl(){
    return axios.get('https://random-word-api.herokuapp.com/word?number=1')
}
//get data
router.get('/data', (req, res, next) => {
    Data.find({'url': req.body.url},function(err, data){
        //tech compensation calculation
        let compensation = data.base_salary * (1 + data.percent_raise) * data.target_bonus + data.four_yr_RSU * data.vest_percent/4;
        res.json({data: data, compensation: compensation});
    });
});

//add data
router.post('/data', (req, res, next) => {
    getUniqueUrl().then((response) => {
        let word = response.data[0];
        let newData = new Data({
            url: word,
            base_salary: req.body.base_salary,
            percent_raise: req.body.percent_raise,
            target_bonus: req.body.target_bonus,
            four_yr_RSU: req.body.four_yr_RSU,
            vest_percent: req.body.vest_percent,
        });
    
        newData.save((err, data) => {
            if(err)res.json({msg: 'Failed to add data', data: data});
            else{
                //tech compensation calculation
                let compensation = data.base_salary * (1 + data.percent_raise) * data.target_bonus + data.four_yr_RSU * data.vest_percent/4;
                res.json({msg: 'Data added successfully', data: data, compensation: compensation});
            }
        });
    }).catch(err => res.json({msg: 'Could not generate URL', err: err}))
    
});

router.delete('/data', (req, res, next) => {
    Data.remove({url: req.body.url}, function(err, result){
        if(err) res.json(err);
        else res.json(result);
    })
})

//update data
router.put('/data', (req, res, next) => {
    Data.findOne({url: req.body.url}, (err, foundObject) => {
        if(err) res.send("Successful find");
        else{
            if(!foundObject) res.send("Could not find object");
            else {
                foundObject.base_salary = req.body.base_salary;
                foundObject.percent_raise = req.body.percent_raise;
                foundObject.target_bonus = req.body.target_bonus;
                foundObject.four_yr_RSU = req.body.four_yr_RSU;
                foundObject.vest_percent = req.body.vest_percent;
                
                foundObject.save(function(error, updatedObject){
                    if(error) res.send("Error updating the data");
                    else{
                        //tech compensation calculation
                        let compensation = updatedObject.base_salary * (1 + updatedObject.percent_raise) * updatedObject.target_bonus + updatedObject.four_yr_RSU * updatedObject.vest_percent/4;
                        res.json({data: updatedObject, compensation: compensation});
                    }
                })
            }
        }
    })
});





module.exports = router;