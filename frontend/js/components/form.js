let zipInput = document.getElementById('zip');
const city = document.getElementById('city');

//Search for a city with its postal code.
//The variable postalcode allows you to retrieve the list of communes associated with a postalcode.
zipInput.onchange = (e) => {
    let zip = e.target.value;
    try {
        const getData = async () => {
            let response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${zip}`);
            let jsonData = await response.json();
            if(jsonData != '') {
                document.getElementById('city').value = jsonData[0].nom;
            } else {
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
