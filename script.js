let transactions = [];

const form = document.getElementById("expenseForm");
const table = document.getElementById("transactionTable");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        document.getElementById("message").textContent = "Enter a valid description and amount.";
        return;
    }

    transactions.push({
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    });

    form.reset();
    document.getElementById("message").textContent = "Transaction added successfully.";
    updateSummary();
    displayTransactions();
});

function updateSummary() {
    let income = 0;
    let expenses = 0;

    // Loop
    for (let i = 0; i < transactions.length; i++) {
        // Condition
        if (transactions[i].type === "income") {
            income += transactions[i].amount;
        } else {
            expenses += transactions[i].amount;
        }
    }

    // Savings = income - expenses
    const savings = income - expenses;

    document.getElementById("totalIncome").textContent = "₹" + income;
    document.getElementById("totalExpense").textContent = "₹" + expenses;
    document.getElementById("savings").textContent = "₹" + savings;
}

function displayTransactions() {
    table.innerHTML = "";

    if (transactions.length === 0) {
        table.innerHTML = '<tr><td colspan="5">No transactions added yet.</td></tr>';
        return;
    }

    transactions.forEach(function(item) {
        const row = document.createElement("tr");
        const cls = item.type === "income" ? "income-text" : "expense-text";
        const sign = item.type === "income" ? "+" : "-";

        row.innerHTML = `
            <td>${item.description}</td>
            <td class="${cls}">${item.type}</td>
            <td>${item.category}</td>
            <td class="${cls}">${sign} ₹${item.amount}</td>
            <td><button class="delete-btn" onclick="deleteTransaction(${item.id})">Delete</button></td>
        `;
        table.appendChild(row);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(function(item) {
        return item.id !== id;
    });
    updateSummary();
    displayTransactions();
    document.getElementById("message").textContent = "Transaction deleted.";
}

displayTransactions();