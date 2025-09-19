const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + sender;
  msgDiv.innerText = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  addMessage(data.reply, "bot");
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
