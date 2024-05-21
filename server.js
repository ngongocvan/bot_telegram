const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config(); // Nạp biến môi trường từ tệp .env

const app = express();
const port = 3000;

// Kiểm tra và lấy token từ biến môi trường
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("Telegram Bot Token not provided!");
}

const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());
app.use(express.static("public"));

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle button data from the web interface
app.post("/sendButtonData", (req, res) => {
  const buttonId = req.body.buttonId;
  let message = "";

  switch (buttonId) {
    case "button1":
      message = "You clicked Button 1";
      break;
    case "button2":
      message = "You clicked Button 2";
      break;
    case "button3":
      message = "You clicked Button 3";
      break;
    default:
      message = "Unknown button";
  }

  // Send a message to a specific chat or user
  const chatId = 1; // Thay bằng chat ID thực tế
  bot.sendMessage(chatId, message);

  res.json({ message: `Button ${buttonId} data sent to Telegram bot` });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Hello! Use the web interface to interact with the bot."
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
