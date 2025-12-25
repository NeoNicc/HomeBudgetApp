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
const month = document.getElementById('month');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const detailedViewButton = document.getElementById('detailedViewButton');
const totalViewTotal = document.getElementById('totalViewTotal');

month.textContent = months[new Date().getMonth()] + ':';
const monthlyTotal = document.getElementById('monthlyTotal');

let gTotal = 0;
let mTotal = 0;
let cTotal = 0;
let medTotal = 0;
let viewTotal = 0;

//the fetch function that populates the board
function loadBudget() {
    console.log("loaded");
    fetch('https://homebudgetapp-5bj9.onrender.com/get-item')
    .then(response => response.json())
    .then(data => {
        const groceryTableBody = document.getElementById('groceryTableBody');
        groceryTableBody.innerHTML = '';
        
        const groceryTotal = document.getElementById('groceryTotal');
        const miscTableBody = document.getElementById('miscTableBody');
        miscTableBody.innerHTML = '';
        
        const miscTotal = document.getElementById('miscTotal');
        const catTableBody = document.getElementById('catTableBody');
        catTableBody.innerHTML = '';
        
        const catTotal = document.getElementById('catTotal');
        const medicineTableBody = document.getElementById('medicineTableBody');
        medicineTableBody.innerHTML = '';
        
        const medicineTotal = document.getElementById('medicineTotal');

        data.forEach(row => {
            const category = (row.CATEGORY || '').toString().trim().toLowerCase();
            const cost = Number(row.COST) || 0;
            const dateShort = (row.RECEIPT_DATE || '').slice(5, 10);

            // create a div-based item: main row + description row
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <div class="mainRow">
                    <div class="location">${row.LOCATION || ''}</div>
                    <div class="cost">${cost ? `$${cost}` : ''}</div>
                    <div class="date">${dateShort}</div>
                </div>
                <div class="descRow"><strong>Description:</strong> ${row.DESCRIPTION || ''}</div>
            `;

            if (category === 'groceries') {
                groceryTableBody.appendChild(item);
                gTotal += cost;
                groceryTotal.innerText = `$${gTotal}`;
            } else if (category === 'misc') {
                miscTableBody.appendChild(item);
                mTotal += cost;
                miscTotal.innerText = `$${mTotal}`;
            } else if (category === 'cat') {
                catTableBody.appendChild(item);
                cTotal += cost;
                catTotal.innerText = `$${cTotal}`;
            } else if (category === 'medicine') {
                medicineTableBody.appendChild(item);
                medTotal += cost;
                medicineTotal.innerText = `$${medTotal}`;
            }

            // update header monthly total
            monthlyTotal.textContent = '$' + (gTotal + mTotal + cTotal + medTotal);
            calculateViewTotal();
        });
    })
    .catch(error => console.error('Error:', error));
}

//this is where im calling the fetch
loadBudget();

//these are the filter buttons event handlers
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
        groceryTable.style.display = 'flex';
    }
    calculateViewTotal();
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
        miscTable.style.display = 'flex';
    }
    calculateViewTotal();
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
        catTable.style.display = 'flex';
    }
    calculateViewTotal();
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
        medicineTable.style.display = 'flex';
    }
    calculateViewTotal();
}
let detailToggle = true;
detailedViewButton.onclick = () => {
    detailToggle = !detailToggle;
    const descriptions = document.querySelectorAll('.descRow');
    descriptions.forEach(desc => {
        desc.style.display = detailToggle ? 'block' : 'none';
    });
}

//these are the nav button event handlers
receiptEntryButton.onclick = () => {
    homeDisplayContainer.style.display = 'none';
    addReceiptContainer.style.display = 'grid';
}
homeButton.onclick = () => {
    homeDisplayContainer.style.display = 'grid';
    addReceiptContainer.style.display = 'none';
}

//determine display style
function isVis(elem) {
    return window.getComputedStyle(elem).display;
}

//calculate the view total
function calculateViewTotal() {
    // recalc viewTotal as the sum of visible category totals
    viewTotal = 0;
    if (window.getComputedStyle(groceryTable).display !== 'none') viewTotal += gTotal;
    if (window.getComputedStyle(miscTable).display !== 'none') viewTotal += mTotal;
    if (window.getComputedStyle(catTable).display !== 'none') viewTotal += cTotal;
    if (window.getComputedStyle(medicineTable).display !== 'none') viewTotal += medTotal;
    totalViewTotal.textContent = '$' + viewTotal;
}