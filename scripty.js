const groceryButton = document.getElementById('groceryButton');
const miscButton = document.getElementById('miscButton');
const catButton = document.getElementById('catButton');
const medicineButton = document.getElementById('medicineButton');

function loadBudget() {
    console.log("loaded");
    fetch('https://homebudgetapp-5bj9.onrender.com/get-item')
    .then(response => response.json())
    .then(data => {
        const groceryTableBody = document.getElementById('groceryTableBody');
        groceryTableBody.innerHTML = '';
        let gTotal = 0;
        const groceryTotal = document.getElementById('groceryTotal');
        const miscTableBody = document.getElementById('miscTableBody');
        miscTableBody.innerHTML = '';
        let mTotal = 0;
        const miscTotal = document.getElementById('miscTotal');
        const catTableBody = document.getElementById('catTableBody');
        catTableBody.innerHTML = '';
        let cTotal = 0;
        const catTotal = document.getElementById('catTotal');
        const medicineTableBody = document.getElementById('medicineTableBody');
        medicineTableBody.innerHTML = '';
        let medTotal = 0;
        const medicineTotal = document.getElementById('medicineTotal');

        data.forEach(row => {
            const tr = document.createElement('tr');
            //add each category table here
            if (row.CATEGORY == 'Groceries') {
                tr.innerHTML = `
                <td>${row.DESCRIPTION}</td>
                <td>${row.COST}</td>
                <td>${row.LOCATION}</td>
                <td>${row.RECEIPT_DATE.slice(5, 10)}</td>
            `;
                groceryTableBody.appendChild(tr);
                gTotal += row.COST;
                groceryTotal.innerText = `$${gTotal}`;
            } else if (row.CATEGORY == 'Misc') {
                tr.innerHTML = `
                <td>${row.DESCRIPTION}</td>
                <td>${row.COST}</td>
                <td>${row.LOCATION}</td>
                <td>${row.RECEIPT_DATE.slice(5, 10)}</td>
            `;
                miscTableBody.appendChild(tr);
                mTotal += row.COST;
                miscTotal.innerText = `$${mTotal}`;
            } else if (row.CATEGORY == 'Cat') {
                tr.innerHTML = `
                <td>${row.DESCRIPTION}</td>
                <td>${row.COST}</td>
                <td>${row.LOCATION}</td>
                <td>${row.RECEIPT_DATE.slice(5, 10)}</td>
            `;
                catTableBody.appendChild(tr);
                cTotal += row.COST;
                miscTotal.innerText = `$${cTotal}`;
            } else if (row.CATEGORY == 'Medicine') {
                tr.innerHTML = `
                <td>${row.DESCRIPTION}</td>
                <td>${row.COST}</td>
                <td>${row.LOCATION}</td>
                <td>${row.RECEIPT_DATE.slice(5, 10)}</td>
            `;
                medicineTableBody.appendChild(tr);
                medTotal += row.COST;
                miscTotal.innerText = `$${medTotal}`;
            }
        });
    })
    .catch(error => console.error('Error:', error));
}
loadBudget();