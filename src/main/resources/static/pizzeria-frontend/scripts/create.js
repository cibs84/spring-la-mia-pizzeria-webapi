ingredientList();

function createPizza() {
    alert("che giocatore");
    let checkboxes = document.querySelectorAll(".form-check-input");
    let checkboxLabels = document.querySelectorAll(".form-check-label");
    let arrCheckedIngredients = [];
    let nameCheckedIngredient;
    let x;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked == true) {
            checkboxLabels.forEach(checkboxLabel => {
                if (checkboxLabel.for == checkbox.id) {
                    nameCheckedIngredient = checkboxLabel.textContent;
                }
                
            });
            
            x = {
                id: checkbox.value,
                name: nameCheckedIngredient
            }
            arrCheckedIngredients.push(x);
        }
    });

    axios
        .post('http://localhost:8080/api/pizze/create', {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,
            price: document.querySelector('#price').value,
            photo: document.querySelector('#photo').value,
            // ingredienti: []
            ingredienti: arrCheckedIngredients
        })
        .then((res) => {
            console.log("Creazione pizza OK!!");
            window.location.href = "./index.html";
        })
        .catch((err) => {
            // ciclare su res.response.data.errors
            console.error("Errore: ", err);
        });
}

function ingredientList() {
    axios
        .get('http://localhost:8080/api/ingredienti')
        .then((res) => {
            console.log('richiesta ok', res);

            // SE non ci sono ingredienti
            if (res.data.length > 0) {
                document.querySelector('#no_ingredients').classList.add("d-none");
            } else {
                document.querySelector('#ingredients').classList.add("d-none");
            }

            document.querySelector("#ingredients").innerHTML = '';
            res.data.forEach(ingrediente => {
                console.log(ingrediente);
                document.querySelector("#ingredients").innerHTML += `
                <input type="checkbox" class="form-check-input" value="${ingrediente.id}" 
				id="ingrediente_${ingrediente.id}">
				<label class="form-check-label me-3" for="ingrediente_${ingrediente.id}">${ingrediente.name}</label>
                `;
            })            
        })
        .catch((res) => {
            // ciclare su res.response.data.errors
            console.log("ERRORE****")
        });
}

