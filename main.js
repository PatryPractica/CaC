function ticketsPrice(evento) {
    evento.preventDefault();

    const ticketsQuantity = document.querySelector(".ticketsQuantity");

    if (Number(ticketsQuantity.value)) {
        const ticketsCategory = document.querySelector(".ticketsCategory");
        const totalPayment = 200 * ticketsQuantity.value * getDiscount(ticketsCategory.value);

        document.querySelector(".ticketsOutput").textContent = `Total a pagar: $${totalPayment}`;
        createBuyButton();
    } else {
        handleInvalidInput();
    }
}

function getDiscount(category) {
    const discounts = {
        "Estudiante": 0.2,
        "Trainee": 0.5,
        "Junior": 0.85
    };
    return discounts[category] || 1; // Si la categoría no está en discounts, no hay descuento (1)
}

function createBuyButton() {
    const outputNode = document.querySelector(".ticketsOutput");
    const spanNode = document.createElement("span");
    spanNode.className = 'ticketsBuy';
    const textNode = document.createTextNode("Comprar");
    spanNode.append(textNode);
    outputNode.append(spanNode);

    document.querySelector(".ticketsBuy").addEventListener("click", ticketsSubmit);
}

function handleInvalidInput() {
    const ticketsQuantity = document.querySelector(".ticketsQuantity");
    ticketsQuantity.style.border = "2px solid red";
    ticketsQuantity.value = "";
    ticketsQuantity.placeholder = "Ingrese una cantidad válida";
    alert("Ingrese una cantidad válida");
}

function ticketsSubmit() {
    const form = document.querySelector(".ticketsForm");
    inputCheck(form);
}

function inputCheck(form) {
    const arrayCheck = [];
    
    for (let i = 0; i < 3; i++) {
        arrayCheck[i] = form[i].value;
        form[i].style.border = arrayCheck[i] ? "1px solid var(--gray-300)" : "2px solid red";
    }

    if (arrayCheck.every(element => element !== "")) {
        const email = form[2].value;
        if (email.includes('@') && email.includes('.')) {
            alert("Formulario enviado");
            form.submit();
        } else {
            handleInvalidEmail();
        }
    } else {
        alert("Completar los campos en rojo");
    }
}

function handleInvalidEmail() {
    alert("Debe ingresar un correo válido");
    document.querySelector(".ticketsEmail").style.border = "2px solid red";
}

function clearInput(evento) {
    document.querySelector("." + evento.target.className).style.border = "1px solid var(--gray-300)";
}

function descuento(evento) {
    const category = evento.target.value;
    document.querySelector("." + category.toLowerCase()).style.backgroundColor = "#f2f2f2";
    updateCategoryStyle(category);
}

function updateCategoryStyle(category) {
    const categories = ["estudiante", "trainee", "junior"];
    
    categories.forEach(cat => {
        const element = document.querySelector("." + cat);
        element.style.backgroundColor = cat === category.toLowerCase() ? "#f2f2f2" : "transparent";
    });
}
