pizzaList();

function pizzaList() {
    axios
        .get('http://localhost:8080/api/pizze') // method e endpoint
        .then((res) => {
            // codice da eseguire se la richiesta è andata a buon fine
            console.log('Richiesta Ok: ', res);

            // SE non ci sono pizze
            if (res.data.length > 0) {
                document.querySelector('#no_pizze').classList.add("d-none");
            } else {
                document.querySelector('#pizze').classList.add("d-none");
            }

            document.querySelector('#pizze_table').innerHTML = '';
            res.data.forEach(pizza => {
                console.log(pizza);
                document.querySelector('#pizze_table').innerHTML += `
                <tr>
			      <td>${pizza.id}</td>
			      <td>${pizza.name}</td>
			      <td>${pizza.description}</td>
			      <td>€ ${pizza.price}</td>
			      <td>
                    <img src="${pizza.photo}" width="100">
                  </td>
                  <td>
                    <a class="btn btn-primary" href="./detail.html?id=${pizza.id}">
                        <i class="fa-solid fa-sheet-plastic"></i> 
                    </a>
                    <a class="btn btn-success" href="./edit.html?id=${pizza.id}">
                        <i class="fa-regular fa-pen-to-square"></i> 
                    </a>
                    <a class="btn btn-danger" onclick="deletePizza(${pizza.id})">
                        <i class="fa fa-trash-alt"></i> 
                    </a>
                  </td>
                </tr>
                `;

            });
        })
        .catch((err) => {
            // codice da eseguire se la richiesta non è andata a buon fine
            console.error('Errore nella richiesta: ', err);
        })
}

function deletePizza(pizzaId) {
    const res = confirm("sei sicuro?");

    if (res) {
        axios
            .delete("http://localhost:8080/api/pizze/delete/" + pizzaId)
            .then((res) => {
                // dopo aver eliminato la pizza mostro di nuovo l'elenco pizze
                pizzaList();
            })
            .catch((res) => {
                console.error("Errore durante l\'eliminazione", res);
                alert('Errore durante l\'eliminazione!');
            });
    }
}