ingredientList(); // INVOCATO DA scripts/ingrediente/index.js

function createPizza(event) {
    event.preventDefault();

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
            console.log("Richiesta Ok", res);

            window.location.href = "./index.html";
        })
        .catch((res) => {
            console.error("Errore nella creazione della pizza: ", res);
            showValidationErrors(res.response.data.errors);
        });
}

function showValidationErrors(errorList) {
    console.error("Errori di validazione: ", errorList);

    resetValidationErrors();
    errorList.forEach(error => {
        document.querySelector("#validation_errors").innerHTML += "<li>"+error.defaultMessage+"</li>";
        document.querySelector(`#${error.field}_err`).innerHTML += "<li>"+error.defaultMessage+"</li>";
    })
}

function resetValidationErrors() {
    document.querySelector("#validation_errors").innerHTML = '';
    document.querySelectorAll("[id$=_err]").forEach(element => { // prende tutti gli elementi html con id che finisce con _err
        element.innerHTML = "";
    });
}

