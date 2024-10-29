// script.js

document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const chatbox = document.getElementById("chatbox");
    const chatList = document.getElementById("chatList");
    const newChatBtn = document.getElementById("newChatBtn");

    let chatHistory = [];
    let currentChatIndex = -1;

    newChatBtn.addEventListener("click", () => {
        if (currentChatIndex !== -1) {
            saveCurrentChat();
        }
        currentChatIndex = chatHistory.length;
        chatHistory[currentChatIndex] = [];
        document.getElementById("userInput").value = '';
        chatForm.style.display = 'flex';
    });

    function saveCurrentChat() {
        const chatName = `Chat ${currentChatIndex + 1}`;
        chatHistory[currentChatIndex].push(chatbox.innerHTML);
        const listItem = document.createElement("li");
        listItem.textContent = chatName;
        listItem.addEventListener("click", () => loadChat(currentChatIndex));
        chatList.appendChild(listItem);
    }

    function loadChat(index) {
        currentChatIndex = index;
        chatbox.innerHTML = chatHistory[currentChatIndex].join('');
        chatForm.style.display = 'flex';
    }

    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userInput = document.getElementById("userInput").value.trim();
        if (userInput === "") return;

        document.getElementById("userInput").value = "";

        const userMessage = document.createElement("div");
        userMessage.className = 'user';
        userMessage.textContent =  userInput;
        chatbox.appendChild(userMessage);

        const loadingIndicator = document.createElement("div");
        loadingIndicator.className = 'loading';
        loadingIndicator.textContent = "Chargement...";
        chatbox.appendChild(loadingIndicator);

        try {
            const response = await fetch("/get-response/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
                },
                body: JSON.stringify({ question: userInput }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            setTimeout(() => {
                chatbox.removeChild(loadingIndicator);

                const botMessage = document.createElement("div");
                botMessage.className = 'bot';
                botMessage.textContent = data.response;
                chatbox.appendChild(botMessage);

                chatbox.scrollTop = chatbox.scrollHeight;
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            setTimeout(() => {
                chatbox.removeChild(loadingIndicator);

                const errorMessage = document.createElement("div");
                errorMessage.className = 'bot';
                errorMessage.textContent = "Chatbot : Désolé, une erreur est survenue.";
                chatbox.appendChild(errorMessage);

                chatbox.scrollTop = chatbox.scrollHeight;
            }, 1000);
        }
    });
});