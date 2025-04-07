const expenseForm = document.getElementById('expenseForm');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseList = document.getElementById('expenseList');

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = expenseName.value;
    const amount = expenseAmount.value;

    if(name === '' || amount === ''){
        alert('Please fill all fields');
        return;
    }

    const expense = {
        id: Date.now(),
        name,
        amount
    }

    addExpenseToList(expense);
    saveExpenseToLocal(expense);

    expenseName.value = '';
    expenseAmount.value = '';
});

function addExpenseToList(expense) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${expense.name} - ₹${expense.amount}
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${expense.id}, this)">Delete</button>
    `;
    expenseList.appendChild(li);
}

function saveExpenseToLocal(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(id, btn) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    btn.parentElement.remove();
}
