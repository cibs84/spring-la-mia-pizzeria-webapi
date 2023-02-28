// Prende l'id dalla query string che proviene da index.html
const URLParams = new URLSearchParams(window.location.search);
const pizzaId = URLParams.get('id');

// Prende l'oggetto Pizza tramite l'api con una chiamata axios
getPizza(pizzaId);

//#############
//  FUNCTIONS
//#############

// Ritorna un oggetto pizza
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
    //  *** PIZZA ***
    document.querySelector('#pizzaName').innerHTML = pizza.name;
    document.querySelector('#pizzaDescription').innerHTML = pizza.description;

    document.querySelector('#pizzaPhoto').src = pizza.photo;
    document.querySelector('#pizzaPhoto').alt = "Immagine Pizza " + pizza.name;

    // *** OFFERS ***
    document.querySelector('#btnOfferCreate').href = "../offers/create.html?pizzaId=" + pizza.id;

    // SE non ci sono offerte
    if (pizza.offers.length > 0) {
        document.querySelector('#no_offers').classList.add("d-none");
    } else {
        document.querySelector('#offers').classList.add("d-none");
    }

    document.querySelector('#offers_table').innerHTML = '';
    pizza.offers.forEach(offer => {
        console.log(offer);
        document.querySelector('#offers_table').innerHTML += `
        <tr>
            <td id="offerTitle">${offer.title}</td>
            <td id="offerStartDate">${offer.startDate}</td>
            <td id="offerEndDate">${offer.endDate}</td>
            <td>
            <a id="btnOfferEdit" class="btn btn-success">
                <i class="fa-regular fa-pen-to-square"></i>
            </a>
            <a id="btnOfferDelete" class="btn btn-danger">
                <i class="fa fa-trash-alt"></i>
            </a>
            </td>
        </tr>
        ` 
    });

    //  *** INGREDIENTS ***
    // SE non ci sono ingredienti
    if (pizza.ingredienti.length > 0) {
        document.querySelector('#no_ingredients').classList.add("d-none");
    } else {
        document.querySelector('#ingredients').classList.add("d-none");
    }

    document.querySelector('#ingredients_table').innerHTML = '';
    pizza.ingredienti.forEach(ingredient => {
        console.log(ingredient);
        document.querySelector('#ingredients_table').innerHTML += `
        <tr>
            <td id="ingredientTitle">${ingredient.id}</td>
            <td id="ingredientStartDate">${ingredient.name}</td>
            <td>
            <a href="http://localhost:8080/api/pizze/update/${pizzaId}" id="btnIngredientEdit" class="btn btn-success">
                <i class="fa-regular fa-pen-to-square"></i>
            </a>
            <a href="http://localhost:8080/api/pizze/delete/${pizzaId}" id="btnIngredientDelete" class="btn btn-danger">
                <i class="fa fa-trash-alt"></i>
            </a>
            </td>
        </tr>
        ` 
    });
}