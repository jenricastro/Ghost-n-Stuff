const express = require ('express');
const mongoose = require('mongoose');
const Creatures = require('./models/ceatures.js');
const creaturesSchema = require('./models/beasts.js');
const userContoller = require('./controllers/user_controller.js')
const session = require('express-session')
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));


// Creatures.create(creaturesSchema, (err, data)=>{
//         if(err) console.log(err.message)
//         console.log('Dealership DB created')
//     });


// Get

app.get('/', (req, res)=>{
    res.render('loading.ejs')
})

app.get('/create', (req, res)=>{
    res.render('create.ejs')
})

app.get('/map', (req, res)=>{
    Creatures.find({}, (err, map)=>{
        res.render('map.ejs', {
            creature: map
        })
    });
});

app.get('/sightings', (req, res)=>{
    Creatures.find({}, (err, allCreatures)=>{
        res.render('sightings.ejs', {
            creatures: allCreatures
        });
    });
});

app.get('/sightings/:id/display', (req, res)=>{
    Creatures.findById(req.params.id, (err, showCreature)=>{
       res.render('display.ejs', {
        creature: showCreature 
      
       }) 
    })
})

app.get('/sightings/:id/edit', (req, res)=>{
    Creatures.findById(req.params.id, (err, editCreature)=>{
        res.render('edit.ejs', {
            creature: editCreature 
          
        })
    })
})

// actions
app.post('/sightings', (req, res)=>{
    if(req.body.hostile === 'on'){
        req.body.hostile = true;
    }else{
        req.body.hostile = false;
    }
    Creatures.create(req.body, (err, data)=>{
        res.redirect('/sightings')
    });
});

app.put('/sightings/:id', (req, res)=>{
    Creatures.findByIdAndUpdate(req.params.id, req.body, (err, update)=>{
        res.redirect('/sightings')
    });
});

app.delete('/sightings/:id', (req, res)=>{
    Creatures.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect('/sightings')
    })
})

//calls

mongoose.connect('mongodb://localhost:27017/creatures', () => {
    console.log('The connection with mongod is established')
})

Creatures.countDocuments({}, (err, data) => {
    if (err) console.log(err.message)
    console.log(`There are ${data} creatures in this database`)
})

app.listen(3000, ()=>{
    console.log('listening')
})