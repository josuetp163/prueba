
const socket = io('http://localhost:3000')

const intervalTime = 60

var timeLeft = intervalTime;

socket.on('connect', () => {
    console.log("CONNECTED");
})

socket.on('get-token', message => {
    document.getElementById("token").innerHTML = String(message.token);
});

function countdown() {
    var timer = document.getElementById("countdown-number");
    timeLeft--;
    timer.textContent = String(timeLeft);
    if (timeLeft > 0) {
        setTimeout(countdown, 1000);
    } else {
        timeLeft = intervalTime;
        setTimeout(countdown, 1000);
        getToken(user)
    }
};

function getToken(user) {
    socket.emit('generate-token', { username: user });
}

getToken(user)
setTimeout(countdown, 1000);


