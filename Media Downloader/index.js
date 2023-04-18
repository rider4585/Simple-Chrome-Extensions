function download() {
    let link = document.querySelector("#link").value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '273fc9eca6msh44ad455b42049cep1ee024jsnf4c08914efa1',
            'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
        }
    };

    fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${link}`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response['link']);
            let downloadPage = window.open(response['link'],"_blank");
            // downloadPage.close();
            setTimeout(downloadPage.close(), 5000);
        })
        .catch(function (err) {
            console.log(err);
        })
}