const { Country, Activities, countryActivities } = require("../db");
const { Router } = require('express');
const axios = require("axios");

const router = Router();

router.post('/', async(req, res) => {
    try{
        const {name, difficult, duration, season, countries} = req.body;
        const act = await Activities.create({
            name,
            difficult,
            duration,
            season,
        });

        const countriesDB = await Country.findAll();

        for(let i = 0; i < countriesDB.length; i++){
            for(let j = 0; j < countries.length; j++){
                if(countriesDB[i].name.toLowerCase().includes(countries[j].toLowerCase()))
                await act.addCountries(countriesDB[i]);
            }
        }
        res.status(201).json([act, countries]);
    }catch(err){
    res.status(400).send(err);
    }
});

router.get("/", async(req,res)=>{
    try {
        const activities = await activities.findAll();
        let countact = await countryActivities.findAll();
        let resp = [];

        for(let i = 0; i < activities.length; i++){
            let nObj = {
                id: activities[i].id,
                name: activities[i].name,
                difficult: activities[i].difficult,
                duration: activities[i].duration,
                season: activities[i].season,
                countries: [],
            }
            for(let e = 0; e < countact.length; e++){
                if(countact[e].dataValues.act === activities[i].id){
                    let countriesDB = await Country.findByPK(
                        countact[e].dataValues.Countryid
                    );
                    nObj.countries.push(countriesDB);
                }
            }
            resp.push(nObj);
        }

        res.status(200).send(activities)
    } catch (err) {
        res.status(404).send(err);
    }
})

module.exports = router;