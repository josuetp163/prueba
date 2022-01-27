document.getElementById('generate').addEventListener("click", generateToken)

function generateToken() {
    let user = document.getElementById("user").value
    if (user == "") {
        document.getElementById('message').style = "{display: block}"
    } else {
        let url = 'generate/' + user
        let options = "statusbar=no,height=400,width=600,xyz=abc";
        let ref = window.open(url, '_blank', options)
        document.getElementById('generate').disabled = true;
        document.getElementById('generate').className = "btn btn-secondary"
    }
}