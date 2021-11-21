var express = require('express');
var cors = require('cors');
var app = express();
var fs = require('fs');
var axios = require('axios');
var bodyParser = require('body-parser')
var csvtojson = require('csvtojson')


app.use(cors());
app.use(bodyParser());

app.post('/image',function(require, res){
    const image = (require.body.image);
    console.log(require.body)
    axios.get('http://127.0.0.1:6000/api', { params: {img: image } })
    return res.send(fs.readFileSync("./image/photo.jpg","base64"))
})

app.post('/csv',(req,res)=>{
    const csv = (req.body.csv)
    console.log(req.body)
    csvtojson().fromFile("../brain/csv.csv").then((file)=>{
        res.send([file])
    })
})

app.listen(9000, function () {
    console.log('Listening on http://localhost:9000/');
});