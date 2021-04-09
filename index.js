const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

//PRODUCTS
const insertproduct = require('./controllers/products/insertproduct');
const updateproduct = require('./controllers/products/updateproduct');
const deleteproduct = require('./controllers/products/deleteproduct');
const getproducts = require('./controllers/products/getproducts');

//PROCESSING
const insertprocessed = require('./controllers/processed/insertprocessed');
const getprocessed = require('./controllers/processed/getprocessed');
const deleteprocessed = require('./controllers/processed/deleteprocessed');

//RECEIVING
const insertreceived = require('./controllers/received/insertreceived');
const getreceived = require('./controllers/received/getreceived');
const deletereceived = require('./controllers/received/deletereceived');


const db = knex({
    client: 'pg',
    connection: {
        host : "127.0.0.1",
        user : '',
        password : '',
        database : 'jsdata'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// END POINTS
//ROOT
app.get('/', (req, res) => { res.send('Welcome to the JStock API!') })
// app.post('/signin', signin.handleSignin(db, bcrypt))

//PROCESSING STOCK
app.post('/insertprocessed', (req, res) => { insertprocessed.handleProcessed(req, res, db) })
app.get('/getprocessed', (req, res) => { getprocessed.handleProcessed(req, res, db) })
app.delete('/deleteprocessed', (req, res) => { deleteprocessed.handleProcessed(req, res, db) })

//RECEIVING STOCK
app.post('/insertreceived', (req, res) => { insertreceived.handleReceived(req, res, db) })
app.get('/getreceived', (req, res) => { getreceived.handleReceived(req, res, db) })
app.delete('/deletereceived', (req, res) => { deletereceived.handleReceived(req, res, db) })

//PRODUCTS
app.get('/getproducts', (req, res) => { getproducts.handleProducts(req, res, db) })
app.post('/insertproduct', (req, res) => { insertproduct.handleProduct(req, res, db) })
app.put('/updateproduct', (req, res) => { updateproduct.handleProduct(req, res, db) })
app.delete('/deleteproduct', (req, res) => { deleteproduct.handleProduct(req, res, db) })
// app.put('/image', (req, res) => { image.handleImage(req, res, db) })
// app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(3000, (req, res) => {
    console.log(`app is running on port 3000`);
})