document.addEventListener('DOMContentLoaded', function () {
    const totalPris = {
        'Classic Burger': 100,
        'Smashed Burger': 120,
        'Special Burger': 95,
        'Boss Burger': 110,
        'Drink': 10
    };

    const orderForm = document.getElementById('orderForm');
    orderForm.innerHTML = generateOrderForm(totalPris);

    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(orderForm);
        let total = 0;
        let orderLista = '';

        for (let [key, value] of formData.entries()) {
            if (totalPris[key] && value > 0 ) {
                total += totalPris[key] * value;
                orderLista += `${value} x ${key} - ${totalPris[key] * value} kr\n`;
            }
        }
        if (total > 0) {
            alert(`Du har beställt:\n${orderLista}\nTotalt pris: ${total} kr\nDitt order nummer är: ${Math.floor(Math.random() * 1000)}`);
        } else {
            alert('Var god och beställ för att få ett ordernummer')
        }
    });
});

function generateOrderForm(prices) {
    let formHTML = '<h3>Välj antal av varje:</h3>';
    for (let item in prices) {
        formHTML += `
            <div class="form-item">
                <label for="${item}">${capitalize(item)} - ${prices[item]} kr:</label>
                <input type="number" id="${item}" name="${item}" min="0" value="0" class="quantity-input">
            </div>
        `;
    }

    formHTML += `
        <h3>Dina uppgifter:</h3>
        <input type="text" id="firstName" name="firstName" placeholder="Förnamn" required>
        <input type="text" id="lastName" name="lastName" placeholder="Efternamn" required>
        <input type="tel" id="phone" name="phone" placeholder="Telefonnummer" required>
        <input type="email" id="email" name="email" placeholder="E-post" required>
        
        <h3>Om du väljer att skicka din beställning så kommer du att få det totala priset samt nummerlapp, som du senare visar på plats. Mer information om address hittar du på "Om Oss"</h3>
        <button type="beställ">Skicka din beställning</button>
    `;

    return formHTML;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showSection(sectionId) {

    const mainBild = document.getElementById('mainbild');

    if (mainBild) {
        mainbild.style.display = sectionId === 'main' ? 'block' : 'none';
    }

    document.querySelectorAll('.content-section').forEach((section) => {
        section.classList.add('hidden');
    });
    const sectionVisas = document.getElementById(sectionId);
    if (sectionVisas) {
        sectionVisas.classList.remove('hidden');
    }

}

document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        showSection(sectionId);
    });
});
