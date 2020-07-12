const express = require('express');
const router = express.Router();
const axios = require('axios');

const Data = require('../models/data');

async function getUniqueUrl(){
    return axios.get('https://random-word-api.herokuapp.com/word?number=1')
}
//get data
router.get('/data/:url', (req, res, next) => {
    Data.find({'url': req.params.url},function(err, data){
        if(err)res.send("error")
        else if(data.length == 0)res.send("nothing found");
        else res.json(data[0]);
    });
});

//add data
router.post('/data', (req, res, next) => {
    // console.log(req.body);
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
                res.json({msg: 'Data added successfully', data: data});
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
    // console.log(req);
    Data.findOne({url: req.body.url}, (err, foundObject) => {
        if(err) res.send("Could not find find");
        else{
            if(!foundObject) res.send("Object nonexistant");
            else {
                foundObject.base_salary = req.body.base_salary;
                foundObject.percent_raise = req.body.percent_raise;
                foundObject.target_bonus = req.body.target_bonus;
                foundObject.four_yr_RSU = req.body.four_yr_RSU;
                foundObject.vest_percent = req.body.vest_percent;
                
                foundObject.save(function(error, updatedObject){
                    if(error) res.send("Error updating the data");
                    else{
                        res.json({data: updatedObject});
                    }
                })
            }
        }
    })
});


router.get('/recentData', (req, res, next) => {
    Data.find({})
    .sort({'id': -1})
    .limit(10)
    .exec(function(err, posts) {
         // `posts` will be of length 10
         var output = [];
         posts.map(obj => {
            output.push({base_salary: obj.base_salary, four_yr_RSU: obj.four_yr_RSU });
         })
         res.json(output);
    });
});


module.exports = router;