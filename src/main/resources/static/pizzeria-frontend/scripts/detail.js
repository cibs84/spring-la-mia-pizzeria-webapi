const URLParams = new URLSearchParams(window.location.search);

const pizzaId = URLParams.get('id');

axios
    .get('http://localhost:8080/api/pizze/' + pizzaId)
    .then((res) => {
        console.log('richiesta ok', res);
        // res.data è una Pizza

        //**********
        //  PIZZA
        //**********
        document.querySelector('#pizzaName').innerHTML = res.data.name;
        document.querySelector('#pizzaDescription').innerHTML = res.data.description;
        
        document.querySelector('#pizzaPhoto').src = res.data.photo;
        document.querySelector('#pizzaPhoto').alt = "Immagine Pizza " + res.data.name;


        //**********
        //  OFFERS
        //**********
        document.querySelector('#btnOfferCreate').href = "../offers/create.html?pizzaId=" + res.data.id;

        // SE non ci sono offerte
        if (res.data.offers.length > 0) {
            document.querySelector('#no_offers').classList.add("d-none");
        } else {
            document.querySelector('#offers').classList.add("d-none");
        }

        document.querySelector('#offers_table').innerHTML = '';
        res.data.offers.forEach(offer => {
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

        //***************
        //  INGREDIENTS
        //***************
        // SE non ci sono ingredientte
        if (res.data.ingredienti.length > 0) {
            document.querySelector('#no_ingredients').classList.add("d-none");
        } else {
            document.querySelector('#ingredients').classList.add("d-none");
        }

        document.querySelector('#ingredients_table').innerHTML = '';
        res.data.ingredienti.forEach(ingredient => {
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
    })
    .catch((res) => {
        console.error('errore nella richiesta: ', res);
    })