function createPizza(event) {
    axios
        .post('http://localhost:8080/api/pizze/create', {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,

        })
        .then((res) => {

        })
        .catch((res) => {
            // ciclare su res.response.data.errors
        });
}