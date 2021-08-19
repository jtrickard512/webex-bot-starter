module.exports = {
    //spawn: (bot, actorId) => {
    //    if (actorId) {
    //        // When actorId is present it means someone added your bot got added to a new space
    //        // Lets find out more about them..
    //        var msg = 'You can say `help` to get the list of words I am able to respond to.';
    //        bot.webex.people.get(actorId).then((user) => {
    //        msg = `Hello there ${user.displayName}. ${msg}`; 
    //        }).catch((e) => {
    //            console.error(`Failed to lookup user details in framwork.on("spawn"): ${e.message}`);
    //            msg = `Hello there. ${msg}`;  
    //        }).finally(() => {
    //          // Say hello, and tell users what you do!
    //            if (bot.isDirect) {
    //                bot.say('markdown', msg);
    //            } else {
    //                let botName = bot.person.displayName;
    //                msg += `\n\nDon't forget, in order for me to see your messages in this group space, be sure to *@mention* ${botName}.`;
    //                bot.say('markdown', msg);
    //            }
    //        })
    //    } else {
    //         // don't say anything here or your bot's spaces will get
    //        // spammed every time your server is restarted
    //        //console.log(`While starting up, the framework found our bot in a space called: ${bot.room.title}`);
    //    }
    //},

    sendHelp: (bot) => {
        bot.say("markdown", 'These are the commands I can respond to:', '\n\n ' +
          '1. **faq** (learn more about Real Deal Survey) \n' +
          "2. **link** (My survey link isn't working) \n" +
          '3. **completed** (Already completed the survey)');
    },
    
    faq: (bot) => {
        let faq1 = 'Every quarter we send the Real Deal to a representative sample of Cisco employees to provide Chuck and the ELT with insights into how our employees are experiencing Cisco. This quarter the Engineering Leadership Team has asked that all employees have an opportunity to participate. This is your chance to use your voice and share your experience.'
        let faq2 = 'The survey should take about 10 minutes to complete. There are 2 open ended responses and 10 quantitative items. All items are optional. '
        let faq3 = 'The survey is open for two weeks and will close EOB on the second Friday after opening.'
        let faq4 = 'Since this is a confidential survey, your individual responses are not shared with anyone outside the survey project team. In order to aggregate at specific levels and enable our insights to help leaders better understand the employee experience, this is not an anonymous survey. Survey results are only published in aggregate form, grouped with all other responses, using reporting rules designed to protect your voice.'
        let faq5 = "We will give you visibility into the results by sending you the report within 30 days of quarter's close. You may also find results from past quarters by visiting our Listening Insights page."
        let faq6 = "The link provided to you is for your individual survey and should not be shared with anyone. We try to prevent people from receiving too many surveys, which is one reason why we do not send out a census every quarter. Instead, we send the Real Deal to a random, representative sample each quarter and will likely include your colleagues in an upcoming quarter."
        let faq7 = 'This is a confidential survey and data are only reported in aggregate. If you have an individual experience that needs to be addressed, please make sure that you reach out to HR Support using the Internal Support Contact Numbers page or contact Ethics using the Ethics Line page.'
        let faq8 = 'jmisenhe@cisco.com is the Real Deal project manager and questions may be directed either to him or to our Team Listening mailer at mailto:teamlistening@cisco.com.'
        
        bot.say("markdown", "Below are the FAQ's:", '\n\n ' +
          `1. **Why am I being asked to take this survey.** ${faq1} \n` +
          `2. **How long will this take me?** ${faq2} \n` +
          `3. **I don't have time to take the survey right now.** ${faq3} \n` +
          `4. **Who will see my responses?** ${faq4} \n` +
          `5. **How can I receive the results to the analysis?** ${faq5} \n` +
          `6. **My colleague wants to take the survey too, can I send them my link?** ${faq6} \n` +
          `7. **I have an individual experience that needs to be addressed.** ${faq7} \n` +
          `8. **I would like to speak to a human** ${faq8}`);
    },
}