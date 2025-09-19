// Show welcome message on load
window.onload = () => {
  showTyping("👋 Welcome to HJH ChatBot! How can I help you today?", "bot");
};

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("🙋 " + message, "user");
  input.value = "";

  showTyping("...", "bot"); // typing indicator

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  removeTyping();
  showTyping("🤖 " + data.reply, "bot");
}

function addMessage(text, sender) {
  const msgContainer = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = `bubble ${sender}`;
  div.textContent = text;
  msgContainer.appendChild(div);
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

function showTyping(text, sender) {
  const msgContainer = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = `bubble ${sender} typing`;
  msgContainer.appendChild(div);

  let i = 0;
  const interval = setInterval(() => {
    div.textContent = text.slice(0, i++);
    if (i > text.length) {
      clearInterval(interval);
      div.classList.remove("typing");
    }
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 30);
}

function removeTyping() {
  const typingBubbles = document.querySelectorAll(".typing");
  typingBubbles.forEach(el => el.remove());
    }
