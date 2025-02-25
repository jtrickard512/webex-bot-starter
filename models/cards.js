export const nonResponder = {
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2",
        "body": [
            {
                "type": "TextBlock",
                "text": "insert greeting here",
                "weight": "bolder",
                "size": "medium"
            },
            {
                "type": "TextBlock",
                "text": "We are looking to gain a better understanding of why people choose not to respond to a survey...so we are sending you another survey. Please let us know why you didn't respond to the Q3 Real Deal survey a few weeks ago, by selecting an option or two below:",
                "wrap": true
            },
            {
                "type": "Input.Toggle",
                "id": "choice1",
                "title": "Too Busy"
            },
            {
                "type": "Input.Toggle",
                "id": "choice2",
                "title": "Forgot to respond"
            },
            {
                "type": "Input.Toggle",
                "id": "choice3",
                "title": "Did not see the survey request"
            },
            {
                "type": "Input.Toggle",
                "id": "choice4",
                "title": "I Do not trust the confidentiality of the survey"
            },
            {
                "type": "Input.Toggle",
                "id": "choice5",
                "title": "I Do not believe the survey is a valuable use of my time"
            },
            {
                "type": "Input.Text",
                "id": "comment",
                "isMultiline": true,
                "placeholder": "Is there anything else you would like us to know?"
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit",
                "data": {
                    "cardType": "input",
                    "id": "surveyInputs"
                }
            }
        ]
    }
};