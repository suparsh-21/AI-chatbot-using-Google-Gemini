let btn = document.querySelector("#sendButton");
let input = document.querySelector("#userInput");
let chatArea = document.querySelector("#chatArea");

const API_KEY = "AIzaSyAlb9Ck9akeRsx_F409A1MAnE6E3C-zXWc";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + API_KEY;

btn.addEventListener("click", function () {

  let userMsg = input.value.trim();
  if (userMsg === "") {
    return;
  }

  let userDiv = document.createElement("div");
  userDiv.classList.add("message", "user-message");
  userDiv.innerText = userMsg;
  chatArea.appendChild(userDiv);

  input.value = "";
  chatArea.scrollTop = chatArea.scrollHeight;


  if (userMsg.toLowerCase() === "who built you") {
    let botDiv = document.createElement("div");
    botDiv.classList.add("message", "bot-message");
    botDiv.innerText = "SUPARSH PANDITA";
    chatArea.appendChild(botDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    return;
  }

  
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: userMsg }
          ]
        }
      ]
    })
  })
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {

    let botReply =
      data.candidates[0].content.parts[0].text;

    let botDiv = document.createElement("div");
    botDiv.classList.add("message", "bot-message");
    botDiv.innerText = botReply;
    chatArea.appendChild(botDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

  })
  .catch(function () {

    let botDiv = document.createElement("div");
    botDiv.classList.add("message", "bot-message");
    botDiv.innerText = "Error connecting to AI";
    chatArea.appendChild(botDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

  });

});
