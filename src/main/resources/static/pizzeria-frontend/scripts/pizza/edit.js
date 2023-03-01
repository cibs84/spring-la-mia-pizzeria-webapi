ingredientList(); // INVOCATO DA scripts/ingrediente/index.js

// Prende l'id dalla query string che proviene da index.html
const URLParams = new URLSearchParams(window.location.search);
const pizzaId = URLParams.get('id');

getPizza(pizzaId);


function getPizza(id) {
    axios
        .get('http://localhost:8080/api/pizze/' + id)
        .then((res) => {
            console.log('richiesta ok', res.data);
            // res.data è una Pizza
            
            populateHtml(res.data);
        })
        .catch((res) => {
            console.error('errore nella richiesta: ', res);
        });
}

function populateHtml(pizza) {
    document.querySelector('#name').value = pizza.name;
    document.querySelector('#description').value = pizza.description;
    document.querySelector('#price').value = pizza.price;
    document.querySelector('#photo').value = pizza.photo;

    let checkboxes = document.querySelectorAll(".form-check-input");
    checkboxes.forEach(checkbox => {
        pizza.ingredienti.forEach(ingrediente => {
            if (ingrediente.id == checkbox.value) {
                checkbox.checked = true;
            }
        })
    })
}

function updatePizza(e) {
    e.preventDefault();
    
    let checkboxes = document.querySelectorAll(".form-check-input");
    let checkboxLabels = document.querySelectorAll(".form-check-label");
    let arrCheckedIngredients = []; // array degli ingredienti checked che verrà inviato all'api tramite chiamata axios
    let nameCheckedIngredient;  // nome del singolo ingrediente checked

    // Popola l'array con gli ingredienti checked che invierà all'api tramite chiamata axios
    checkboxes.forEach(checkbox => {
        if (checkbox.checked == true) {
            checkboxLabels.forEach(checkboxLabel => {
                if (checkboxLabel.for == checkbox.id) {
                    nameCheckedIngredient = checkboxLabel.textContent;
                    alert(checkboxLabel.for);
                }
            });
            alert(nameCheckedIngredient);
            arrCheckedIngredients.push({id: checkbox.value, name: nameCheckedIngredient});
        }
    });

    // Chiamata post per la modifica della Pizza
    axios
        .put('http://localhost:8080/api/pizze/update/' + pizzaId, {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,
            price: document.querySelector('#price').value,
            photo: document.querySelector('#photo').value,
            ingredienti: arrCheckedIngredients
        })
        .then((res) => {
            console.log("res: ", res);
            window.location.href = "./index.html";
        })
        .catch((err) => {
            // ciclare su res.response.data.errors
            console.error("Errore nella richiesta: ", err);
            console.log("#################", res.response.data.errors);
        });
}



