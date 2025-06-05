const axios = require('axios');

exports.sendSlackAlert = async (message) => {
  const webhookURL = process.env.SLACK_WEBHOOK_URL;

  await axios.post(webhookURL, {
    text: `🚨 *FireLog Alert*\n${message}`,
  });
};
