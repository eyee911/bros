const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');
const e = require('express');
document.addEventListener("DOMContentLoaded", event => {

    
})
// const firebase = require('firestore')

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

admin.initializeApp(functions.config().firebase);


async function getFirestore() {
    const firestore_con = await admin.firestore();
    const writeResult = firestore_con.collection('posts').doc('firstpost').get().then(doc => {
        if (!doc.exists) { console.log('No such document!'); }
        else { return doc.data(); }
    })

        .catch(err => { console.log('Error getting document', err); });
    return writeResult
}



 app.get('/', async (request, response) => {
    var db_result = await getFirestore();
    console.log('dbresult', db_result);
    response.render('index', { db_result });
});
exports.app = functions.https.onRequest(app);


async function insertFormData(request) {
    const writeResult = await admin.firestore().collection('firstpost').add({
        firstname: request.body.firstname,
        lastname: request.body.lastname
    })
        .then(function () { console.log("Document successfully written!"); })
        .catch(function (error) { console.error("Error writing document: ", error); });
}

function updatePost(e){
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');+
    myPost.update({title: e.target.value}
        ) 
}


app.post('/insert_data', async (request, response) => {
    var insert = await insertFormData(request);
    response.sendStatus(200);
});

    // // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
