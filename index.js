require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const PORT = 5001;
const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const sentMessages = async () => {
   const chatId = process.env.CHAT_ID;
   await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "Hi! I'm bot",
   });
   return res.send();
};
const init = async () => {
   //test auto sent when run
   sentMessages();
   const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
   //    console.log(res.data);
};
// app.post(URI, async (req, res) => {
//    //    console.log(req.body);
//    const chatId = req.body.message.chat.id,
//       text = req.body.message.text;
//    await axios.post(`${TELEGRAM_API}/sendMessage`, {
//       chat_id: chatId,
//       text: text,
//    });
//    return res.send();
// });

app.listen(process.env.PORT || PORT, async () => {
   console.log("🚀 app running on port", process.env.PORT || PORT);
   await init();
});
