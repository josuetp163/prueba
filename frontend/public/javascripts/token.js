
//const socket = io('http://localhost:3000')

const intervalTime = 60

var timeLeft = intervalTime;

/**
 * SocketVersion
 */

/*socket.on('connect', () => {
    console.log("CONNECTED");
});

socket.on('get-token', message => {
    document.getElementById("token").innerHTML = String(message.token);
});*/


async function changeValue() {
    var timer = document.getElementById("countdown-number");
    timer.textContent = String(timeLeft);
}

function countdown() {
    timeLeft--;
    changeValue();
    if (timeLeft <= 0){
        timeLeft = intervalTime;
        getToken(user)
    }
};

function getToken(user) {
    /*socket.emit('generate-token', { username: user });*/
    fetch('http://localhost:3000/tokens/generarToken/?cliente=' + user)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("token").innerHTML = String(data.token);
        });

}

getToken(user)
window.setInterval(countdown,1000)


