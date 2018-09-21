const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 2000;

hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log('unable to write in file.');
        }
    });

next();
})

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page'
    });
});

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});


app.listen(port,()=>{
    console.log(`server is up and runnng on port ${port}`)
});