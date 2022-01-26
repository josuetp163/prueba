
const socket = io('http://localhost:3000')

const intervalTime = 20

var timeLeft = intervalTime;

socket.on('connect', () => {
    console.log("CONNECTED");
})

socket.on('get-token', message => {
    console.log(message);
    document.getElementById("token").innerHTML = String(message.token);
});

function countdown() {
    timeLeft--;
    document.getElementById("seconds").innerHTML = String(timeLeft);
    if (timeLeft > 0) {
        setTimeout(countdown, 1000);
    } else {
        timeLeft = intervalTime;
        setTimeout(countdown, 1000);
        getToken()
    }
};

function getToken() {
    console.log("TOKEN!!!")
    socket.emit('generate-token', { id: 1 });
}

getToken()
setTimeout(countdown, 1000);


