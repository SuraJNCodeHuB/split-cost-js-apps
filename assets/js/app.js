function User(name, email, mobile, photo ) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.photo = photo;
}


function Expense(description, amount) {
    this.description = description;
    this.amount = amount;
    this.isSettled = false;
    this.date = new Date();
}


function SplitCostApp(){
    this.unsettledAmount = 0;
    this.users = [];
    this.expenses = [];
    
    this.displayUnsetteledAmount = function() {
        document.querySelector(".amount").textContent = `$${this.unsettledAmount}`;
    }

    this.addUser = function(name, email, mobile, photo) {
        const user = new User(name, email, mobile, photo);
        this.users.push(user);
    }

    this.displayUsers = function(){
        let userElements = '';
        for(let user of this.users) {
            userElements += `<div><img src ="${user.photo}" alt="${user.name}"/></div>`
        }
        document.querySelector(".users-wrapper").innerHTML = userElements;
    }

    this.displayExpense = function() {
        let expenseElements = '';
        for(let expense of this.expenses) {
            expenseElements += `
             <div class="expenses-item">
                <div>
                    <span>${expense.description}</span>
                    <span>${expense.amount}</span>
                </div>
                 <div class="date">${expense.date}</div>
            </div>
            `
        }
        document.querySelector(`.expenses-wrapper`).innerHTML = expenseElements;
    }

    this.addExpenses = function(event) {
        event.preventDefault();
        console.log('Adding expenses...');
        const description = document.querySelector('#description').value;
        const amount = document.querySelector('#amount').value;  

        if (description && amount){
            const expense = new Expense(description, amount);
            this.expenses.unshift(expense);

            this.displayExpense();
            document.querySelector("form").reset();   
            this.calculateUnsettledAmount();
            this.displayUnsetteledAmount(); 
        }
    }
     this.calculateUnsettledAmount = function () {
        let total = 0;
        for(let expense of this.expenses) {
            total = total + Number(expense.amount);
        }
        const unsettledAmount = total / this.users.length;
        this.unsettledAmount = unsettledAmount;
     }



    this.addNewEventListener = function() {
        document.querySelector("form").addEventListener('submit', (event) => {
            this.addExpenses(event);
        });
    }
}

const splitCostApp = new SplitCostApp();
splitCostApp.addNewEventListener();
splitCostApp.displayUnsetteledAmount();
splitCostApp.addUser('Alex','alex@gmail.com', '9860434408', 'https://randomuser.me/api/portraits/men/90.jpg');
splitCostApp.addUser('David','alex@gmail.com', '9860434408', 'https://randomuser.me/api/portraits/lego/3.jpg');
splitCostApp.addUser('Saurab','alex@gmail.com', '9860434408', 'https://randomuser.me/api/portraits/lego/5.jpg');
splitCostApp.addUser('Sdny','alex@gmail.com', '9860434408', 'https://randomuser.me/api/portraits/lego/7.jpg');
splitCostApp.displayUsers();
