const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

var cors = require('cors');
app.use(cors());

let resList = [
  {
    userName: 'dbp5208',
    startDate: '11/10/2019',
    startTime: '1400'
  },
  {
    userName: 'abc123',
    startDate: '11/11/2019',
    startTime: '1500'
  }
];
fs.writeFile('API.json', JSON.stringify(resList), err => {
  if (err) throw err;
  console.log('Saved file');
});

//Create Reservation
app.post('/postName/:userName/postStartD/:startDate/postStartT/:startTime', (req, res) => {
  let userName = req.params.userName;
  let startDate = req.params.startDate;
  let startTime = req.params.startTime;

  let newRes = {};
  newRes.userName = userName;
  newRes.startDate = startDate;
  newRes.startTime = startTime;

  resList.push(newRes);

  fs.writeFile('API.json', JSON.stringify(resList), err => {
    if (err) throw err;
    console.log('Saved file');
  });
});

//Getting information from a user
app.get('/getName/:userName', (req, res) => {
  let userName = req.params.userName;

  let resData = fs.readFileSync("API.json");
  let resInfo = JSON.parse(resData);

  for (var i = 0; i < resInfo.length; i++){
    if (userName == resInfo[i].userName){
      res.send(resInfo[i]);
    }
  }
});

//Getting list of reservations for all users
app.get('/getAllRes', (req, res) => {
  let resData = fs.readFileSync("API.json");
  let resInfo = JSON.parse(resData);
    res.send(resInfo);
});

//Update information about a user
app.put('/putName/:userName/putStartD/:startDate/putStartT/:startTime', (req, res) => {
  let userName = req.params.userName;
  let startDate = req.params.startDate;
  let startTime = req.params.startTime;

  let resData = fs.readFileSync("API.json");
  let resInfo = JSON.parse(resData);

  for (var i = 0; i < resInfo.length; i++){
    if (userName == resInfo[i].userName){
      resInfo[i].startDate = startDate;
      resInfo[i].startTime = startTime;
      resList[i].startDate = startDate;
      resList[i].startTime = startTime;
    }
  }
  fs.writeFile('API.json', JSON.stringify(resInfo), err => {
    if (err) throw err;
    console.log('Saved file');
  });
});

//Delete reservations
app.delete('/deleteName/:userName', (req, res) => {
  let userName = req.params.userName;

  let resData = fs.readFileSync("API.json");
  let resInfo = JSON.parse(resData);

  for (var i = 0; i < resInfo.length; i++){
    if (userName == resInfo[i].userName){
      resInfo.splice(i,1);
      resList.splice(i,1);
    }
  }
  fs.writeFile('API.json', JSON.stringify(resInfo), err => {
    if (err) throw err;
    console.log('Saved file');
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
