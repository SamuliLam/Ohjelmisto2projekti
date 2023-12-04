/*Javascript for difficulty page*/

async function sendAjaxRequest(difficulty){
    try {
        const response = await fetch(`http://127.0.0.1:5000/difficulty/${difficulty}`);
        const jsonData = await response.json();
        return Promise.resolve(jsonData)
    }catch (err){
        console.log(err);
        return Promise.reject(err)
    }
}


const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

sendAjaxRequest(difficulty).then((response) => {
    console.log("blyat")
    console.log(response);
})