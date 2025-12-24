function loadBudget() {
    console.log("loaded");
    fetch('https://homebudgetapp-5bj9.onrender.com/get-item')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.DESCRIPTION}</td>
                <td>${row.COST}</td>
                <td>${row.CATEGORY}</td>
                <td>${row.LOCATION}</td>
                <td>${row.RECEIPT_DATE}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error:', error));
}
loadBudget();