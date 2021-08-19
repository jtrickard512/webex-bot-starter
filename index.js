const Webex = require('webex');
const config = require("./config.json");
const xlsxFile = require('read-excel-file/node');
const { invitation } = require('./models/realdeal.js');
const webex = Webex.init({
    credentials: {
      access_token: config.token
    }
});

 // send message
function sendMessage(email,message) {
    webex.messages.create({
        toPersonEmail: email,
        text: message
    }).then((message) => { 
        console.log(message)
    })
    .catch((err) => { 
        console.log(err.headers)
    });
};

xlsxFile('./rdlist.xlsx').then((rows) => {
    for(i in rows){
        if (i > 0) {
            let email = rows[i][1];            
            let message = invitation(rows[i][0],rows[i][2]);
            sendMessage(email,message)
        }
    }
    //console.log(rows);
    //console.table(rows);
});

