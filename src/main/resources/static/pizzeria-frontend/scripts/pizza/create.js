ingredientList(); // INVOCATO DA scripts/ingrediente/index.js

function createPizza() {
    let checkboxes = document.querySelectorAll(".form-check-input");
    let checkboxLabels = document.querySelectorAll(".form-check-label");
    let arrCheckedIngredients = [];
    let nameCheckedIngredient;

    // Popola l'array con gli ingredienti checked che invierà all'api tramite chiamata axios
    checkboxes.forEach(checkbox => {
        if (checkbox.checked == true) {
            checkboxLabels.forEach(checkboxLabel => {
                if (checkboxLabel.for == checkbox.id) {
                    nameCheckedIngredient = checkboxLabel.textContent;
                }
                
            });
            arrCheckedIngredients.push({id: checkbox.value, name: nameCheckedIngredient});
        }
    });

    // Chiamata post per la creazione della Pizza
    axios
        .post('http://localhost:8080/api/pizze/create', {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,
            price: document.querySelector('#price').value,
            photo: document.querySelector('#photo').value,
            ingredienti: arrCheckedIngredients
        })
        .then((res) => {
            alert(".then");
            console.log("Richiesta Ok", res);
            console.log("*******", res.response.data.errors);

            return window.location.href = "./index.html";
        })
        .catch((err) => {
            // ciclare su res.response.data.errors
            console.error("Errore nella richiesta: ", err);
            console.log("#################", res.response.data.errors);
        });
}



