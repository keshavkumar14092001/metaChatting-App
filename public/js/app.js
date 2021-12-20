const socket = io()
let userName;
let textArea = document.querySelector('#writtenText');
let sendButton = document.querySelector('#userSend');
let appendingArea = document.querySelector('.textArea');

do {
    userName = prompt('Please enter your name: ')
} while (!userName)

sendButton.addEventListener('click', (e) => {
    let textData = textArea.value;
    sendMessage(textData);
})

function sendMessage(textData) {
    let msg = {
        user: userName,
        message: textData.trim()
    }

    // Now appending message:
    appendMessage(msg, 'outgoing');
    textArea.value = '';
    scrollToBottom();

    // Sending message to the server:
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;

    appendingArea.appendChild(mainDiv);
}

// Receiving Message:
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom()
})

function scrollToBottom() {
    appendingArea.scrollTop = appendingArea.scrollHeight
}