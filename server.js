const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { createClient } = require('@supabase/supabase-js');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const supabaseUrl = 'https://swevciesjgaldunszmle.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXZjaWVzamdhbGR1bnN6bWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NDM2MjUsImV4cCI6MjAzMzUxOTYyNX0.4ZUhR5AQ28yGEgFhlE9GWLKpRL5dX5cj3tGsI_ow4Ic'; // Replace with your Supabase public key

const supabase = createClient(supabaseUrl, supabaseKey);


const db = knex({
    client: 'pg',
    connection: {
        host: 'aws-0-ca-central-1.pooler.supabase.com',
        user: 'BrandonFyall',
        password: 'EwwBrotherWhatsThat?!',
        database: 'postgres',
    }
});

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(4000, ()=> {
    console.log('app is running on port 4000');
})