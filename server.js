const express = require ('express');
const mongoose = require('mongoose');
const Creatures = require('./models/ceatures.js');
const creaturesSchema = require('./models/beasts.js');
const userContoller = require('./controllers/user_controller.js')
const session = require('express-session')
const methodOverride = require('method-override');

// const sessionsController = require('./controllers/sessions_controller.js')
const app = express();
// app.use('/users', userContoller);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
// require('dotenv').config();
// const PORT = process.env.PORT
// const mongodbURI = process.env.MONGODBURI
// app.use('/sessions', sessionsController)
app.use(express.static('public'));


// app.use(
//     session({
//       secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
//       resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
//       saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
//     })
//   )
  

// Creatures.create(creaturesSchema, (err, data)=>{
//         if(err) console.log(err.message)
//         console.log('Dealership DB created')
//     });




// Get

app.get('/create', (req, res)=>{
    res.render('create.ejs')
})

app.get('/', (req, res)=>{
    res.render('./public/loading.ejs')
})

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