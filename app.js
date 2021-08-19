//Webex Bot Starter - featuring the webex-node-bot-framework - https://www.npmjs.com/package/webex-node-bot-framework
var framework = require('webex-node-bot-framework');
var webhook = require('webex-node-bot-framework/webhook');
var express = require('express');
const requests = require('request');
const { MongoClient, ObjectID } = require('mongodb');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const config = require("./config.json");
const client = new MongoClient('mongodb://localhost:27017',{useUnifiedTopology:true});

client.connect().then(() => {
	console.log('Mongo Connected');
}).catch((e) => {
	console.log(`Mongo Error: ${e}`);
});

const db = client.db('real-deal');
const session_collection = db.collection('non-responders');

//require routes

const {sendHelp, faq} = require('./controllers/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mount routes
//app.use('/', indexRouter);

// init framework
var framework = new framework(config);
framework.start();
console.log("Starting framework, please wait...");

framework.on("initialized", () => {
  console.log("framework is all fired up! [Press CTRL-C to quit]");
});

// A spawn event is generated when the framework finds a space with your bot in it
// If actorId is set, it means that user has just added your bot to a new space
// If not, the framework has discovered your bot in an existing space
//framework.on('spawn', spawn(bot, actorId));
framework.on('spawn', function (bot, id, addedBy) {
  if (!addedBy) {
    // don't say anything here or your bot's spaces will get 
    // spammed every time your server is restarted
    framework.debug(`Framework created an object for an existing bot in a space called: ${bot.room.title}`);
  } else {
    // addedBy is the ID of the user who just added our bot to a new space, 
    // Say hello, and tell users what you do!
    bot.say('Hi there, you can say hello to me.  Don\'t forget you need to mention me in a group space!');
  }
});
//Process incoming messages
let responded = false;
/* On mention with command
ex User enters @botname help, the bot will write back in markdown
*/
framework.hears(/help|what can i (do|say)|what (can|do) you do/i, (bot, trigger) => {
  console.log(`someone needs help! They asked ${trigger.text}`);
  responded = true;
  bot.say(`Hello ${trigger.person.displayName} .Thank you for being interested in Real Deal Survey.`)
    .then(() => sendHelp(bot))
    .catch((e) => console.error(`Problem in help hander: ${e.message}`));
});

framework.hears('faq', (bot) => {
  console.log("FAQ command received");
  responded = true;
  bot.say('Thank you for being interested in Real Deal Survey.')
  .then(() => faq(bot))
  .catch((e) => console.error(`Problem in help hander: ${e.message}`));
});

framework.hears('link', (bot, trigger) => {
  console.log("link command received");
  responded = true;
  //the "trigger" parameter gives you access to data about the user who entered the command
  var msg = 'In order to access the survey you do need to be on the vpn. Can you please connect to the vpn and retry.\n If you are on the vpn and still having trouble, please contact jmisenhe@cisco.com for further assistance.';
  responded = true;
  bot.say('I am sorry that you are having trouble accessing the real deal survey.')
  .then(() => bot.say("text",msg))
  .catch((e) => console.error(`Problem in help hander: ${e.message}`));
});

framework.hears('completed', (bot) => {
  console.log("completed command received");
  responded = true;
  //the "trigger" parameter gives you access to data about the user who entered the command
  responded = true;
  var msg = "You don’t need to do anything more right now, you will be removed from the Real Deal Survey Reminders. But, we may reach back out to you in the next few weeks with other related reminders and to share the high level results."
  bot.say("Thank you for participating in the real deal survey and sharing your voice.")
  .then(() => bot.say("text",msg))
  .catch((e) => console.error(`Problem in help hander: ${e.message}`));
});


// Process a submitted card
framework.on('attachmentAction', async (bot, trigger) => {
  response = trigger.attachmentAction

  session_collection.insertOne(trigger)
  //console.log(trigger)
  await bot.censor(response['messageId']);

  let message = `Thank you ${trigger.person['nickName']} for taking the time to share your feedback`
  await bot.say('text',message);
  
});

/* On mention with unexpected bot command
  Its a good practice is to gracefully handle unexpected input
*/
framework.hears(/.*/, (bot, trigger) => {
  // This will fire for any input so only respond if we haven't already
  if (!responded) {
    console.log(`catch-all handler fired for user input: ${trigger.text}`);
    bot.say(`Sorry, I don't know how to respond to "${trigger.text}"`)
      .then(() => sendHelp(bot))
      .catch((e) => console.error(`Problem in the unexepected command hander: ${e.message}`));
  }
  responded = false;
});

//Server config & housekeeping
// Health Check
app.get('/', (req, res) => {
  res.send(`I'm alive.`);
});

app.post('/', webhook(framework));

//app.get('/realdeal/ping', (req, resp, next) => {
//	resp.json(new Date().getTime()).end();
//});

//function realdealRedirect(req,resp,next){
 // const db = client.db('real-deal');
 // const session_collection = db.collection('redirect');
 // let fullUrl = req.protocol + "://" + req.get('host') + req.originalUrl;
 // let id = fullUrl.split('/')[4];
 // console.log(fullUrl)
 // session_collection.insertOne({survey_id:id,created: new Date().getTime()})
 // resp.redirect(`https://www.cisco.vovici.com/se/${id}`);
//}
//
//app.get('/realdeal/:id', realdealRedirect)


var server = app.listen(config.port, () => {
  framework.debug('framework listening on port %s', config.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', () => {
  framework.debug('stoppping...');
  server.close();
  framework.stop().then(() => {
    process.exit();
  });
});
