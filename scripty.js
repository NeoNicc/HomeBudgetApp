const homeDisplayContainer = document.getElementById('homeDisplayContainer');
const addReceiptContainer = document.getElementById('addReceiptContainer');
const homeButton = document.getElementById('homeButton');
const receiptEntryButton = document.getElementById('receiptEntryButton');
const groceryButton = document.getElementById('groceryButton');
const groceryTable = document.getElementById('groceryTable');
const miscButton = document.getElementById('miscButton');
const miscTable = document.getElementById('miscTable');
const catButton = document.getElementById('catButton');
const catTable = document.getElementById('catTable');
const medicineButton = document.getElementById('medicineButton');
const medicineTable = document.getElementById('medicineTable');

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
let gToggle = true;
groceryButton.onclick = () => {
    if (gToggle == true) {
        gToggle = false;
    } else {
        gToggle = true;
    }
    if (gToggle == false) {
        groceryTable.style.display = 'none';
    } else {
        groceryTable.style.display = 'block';
    }
}
let mToggle = true;
miscButton.onclick = () => {
    if (mToggle == true) {
        mToggle = false;
    } else {
        mToggle = true;
    }
    if (mToggle == false) {
        miscTable.style.display = 'none';
    } else {
        miscTable.style.display = 'block';
    }
}
let cToggle = true;
catButton.onclick = () => {
    if (cToggle == true) {
        cToggle = false;
    } else {
        cToggle = true;
    }
    if (cToggle == false) {
        catTable.style.display = 'none';
    } else {
        catTable.style.display = 'block';
    }
}
let medToggle = true;
medicineButton.onclick = () => {
    if (medToggle == true) {
        medToggle = false;
    } else {
        medToggle = true;
    }
    if (medToggle == false) {
        medicineTable.style.display = 'none';
    } else {
        medicineTable.style.display = 'block';
    }
}

receiptEntryButton.onclick = () => {
    homeDisplayContainer.style.display = 'none';
    addReceiptContainer.style.display = 'grid';
}
homeButton.onclick = () => {
    homeDisplayContainer.style.display = 'grid';
    addReceiptContainer.style.display = 'none';
}