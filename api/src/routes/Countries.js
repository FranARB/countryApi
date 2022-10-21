const { Country, Activities, countryActivities } = require("../db");
const { Router } = require('express');
const axios = require("axios");

const router = Router();
//configuración de routers
//ej.: router.use('/auth',authRouter);
router.get('/', async (req, res) => {
    try {
        const { nameQu } = req.query;

        if (nameQu) {
            let table = await Country.findAll()
            const str = [];
            const result = [];

            table.map((el) => {
                if (typeof el.name === 'string' || el.name instanceof String) str.push(el)
            })  //validación del "name"
            str.map((eli) => {
                if (eli.name.toLowerCase().includes(nameQu.toLocaleLowerCase())) result.push(eli)
            })  //validación si coinciden los datos "name" con "nameQu"
            if (result.length) return res.status(200).json(result);
            return res.status(404).json({ message: `We're sorry. Couldn't find ${nameQu}` })
        } else {
            const table = await Country.findAll();
            if (!table.length) {
                let datar;  //poder manejar la variable a mi antojo
                await axios
                    .get(`https://restcountries.com/v3/all`)
                    .then((result) => (datar = result.data));

                for (let i = 0; i < datar.length; i++) {
                    if (Array.isArray(datar[i].capital))
                        await Country.create({
                            name: datar[i].name.official,
                            nameCommon: datar[i].name.common,
                            img: datar[i].flags[1],
                            continent: datar[i].continent[0],
                            capital: datar[i].capital[0],
                            area: datar[i].area,
                            population: datar.population,
                        });
                }
                const tableF = await Country.findAll();
                return res.status(200).send(tableF);    //se envía lo creado
            } else {
                return res.status(200).send(table); //en caso de que exista, se envia lo existen
            }
        }
    } catch (err) {
        res.json({
            message: "Error, wrong information",
            error: err,
        })
    }
})

router.get("/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const obj = await Country.findByPk(id)
        const ActivitiesDB = await countryActivities.findAll();
        let newObj = {
            id: id,
            name: obj.name,
            img: obj.img,
            continent: obj.continent,
            capital: obj.capital,
            area: obj.area,
            population: obj.population,
            Activities: [],
        }
        for (let i = 0; i < ActivitiesDB.length; i++) {
            if (ActivitiesDB[i]===id)newObj.Activities.push(ActivitiesDB[i])
        }
        return res.status(200).json(newObj)
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router;