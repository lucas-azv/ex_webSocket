const outputDiv = document.getElementById("output");
const messageInput = document.getElementById("messageInput");

const displayedMessages = new Set();

function displayMessage(message) {
    if (!displayedMessages.has(message)) {
        displayedMessages.add(message);
        const p = document.createElement("p");
        p.textContent = message;
        outputDiv.appendChild(p);
    }
}

const socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = () => {
    displayMessage("Conectado ao WebSocket");
};

socket.onmessage = (event) => {
    displayMessage("Mensagem recebida do servidor: " + event.data);
};

socket.onclose = () => {
    displayMessage("Conexão WebSocket fechada");
};

function sendMessage() {
    const message = messageInput.value;
    if (message && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        displayMessage("Você: " + message);
        messageInput.value = "";
    } else if (socket.readyState !== WebSocket.OPEN) {
        displayMessage("Conexão já está fechada.");
    }
}

function closeConnection() {
    if (socket.readyState === WebSocket.OPEN) {
        socket.close();
        displayMessage("Conexão fechada.");
    } else {
        displayMessage("A conexão já está fechada.");
    }
}
