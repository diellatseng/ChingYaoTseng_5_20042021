let postalCode = document.getElementById('postalCode');
const city = document.getElementById('city');

//Convert postalcode to city name:
//retrieve the list of communes associated with a postalcode, and then display it to "commune".
postalCode.onchange = (e) => {
    let postalCode = e.target.value;
    try {
        const getData = async () => {
            let response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
            let jsonData = await response.json();
            if(jsonData != '') {
                document.getElementById('city').value = jsonData[0].nom;
            } else {
                //If postalcode entered is not valid, return alert message to user
                window.alert("Veuillez entrer le code postal correct")
            }
            console.log(jsonData);
        };
        getData();
    } catch(error) {
        window.alert(error);
        console.log(error);
    }
};