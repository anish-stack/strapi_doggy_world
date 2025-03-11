const axios = require('axios');

const sendRegisterComplete = async (mobileNumber, templetename = "registration_complete", language = "en_US", url = '') => {
    try {
        if (!mobileNumber) {
            throw new Error('Missing mobile number');
        }
       

        const API_END_POINT = 'https://api.interakt.ai/v1/public/message/';

        const options = {
            method: 'POST',
            url: API_END_POINT,
            headers: {
                'Authorization': `Basic UllfVU5FMEcyYnFGd2lNb1FGV2hZZmkzOTNHT0FkaFY3NG4xamx3dEJPRTo=`,
                'Content-Type': 'application/json'
            },
            data: {
                countryCode: "+91",
                phoneNumber: mobileNumber,
                callbackData: "some text here",
                type: "Template",
              
                template: {
                    name: templetename,
                    languageCode: language
                }
            }
        };

        console.log("options", options)
        const response = await axios(options);
        console.log(`${templetename} message sent successfully:`, response.data);
        return response.data;
    } catch (error) {
        // console.error('Error sending registration message:', error.response ? error.response.data : error.message);
        throw error;
    }
};


module.exports = sendRegisterComplete;
