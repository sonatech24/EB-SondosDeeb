class ATM {
    constructor(bank, users) {
        this.bank = bank;
        this.users = users; // dictionary of users
    }
    // -------------------------------------------------------------
    // Check if user has an account in this Bank
    select_user(user_name) {
        let lowercase_name = user_name.toLowerCase(); // to accomodate users inputs(whether it's lower or upper case)

        if (lowercase_name in this.users) {
            return this.users[lowercase_name];
        } else {
            alert("Sorry! We can't find your data, Please visit one of the bank branches");
            return null;
        }
    }
    // -------------------------------------------------------------
    // Check if user has enough money to withdraw by using Bank class method 
    check_balance_for_withdraw(user, withdraw_amount) {
        if (this.bank.check_user_balance(user, withdraw_amount)) {
            return `Successful Withdraw Transaction! Your Current Balance now is: ${user.balance} $`;
        } else {
            return "Error! Insufficient Balance for Withdraw";
        }
    }
    // -------------------------------------------------------------    
    provide_cash_card() {
        return "Please take your card to deliver the cash";
    }
}
// ______________________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________________
class ATM_controller{
    constructor(users,atm) {  
        this.users = users;// dictionary of users
        this.atm = atm
    } 
    // -------------------------------------------------------------

    perform_withdraw(user_name, withdraw_amount) {
        let user = this.atm.select_user(user_name); // it returns User(name, balance)

        if (user) {
            let result = this.atm.check_balance_for_withdraw(user, withdraw_amount);
            alert(result); // inform user whether the withdraw transaction successfuly completed or there's an Error
            if (result.includes("Successful")) {
                alert(this.atm.provide_cash_card()); // Provide the card and cash
            }
        }
    }
}
// ______________________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________________
class User {
    constructor(name, balance) { // we use this class to define(connect) name and balance with the input data from the user
        this.name = name;
        this.balance = balance;
    }
    // NOTE: here I didn't use  "specify_cash_amount_withdraw()" because it's already taken from input in the interface 
}
// ______________________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________________
class Bank {
    check_user_balance(user, withdraw_amount) {
        if (user.balance >= withdraw_amount) {
            user.balance -= withdraw_amount;
            return true;
        } else {
            return false;
        }
    }
}

//.......................................................................................................................
// Dictionary to hold users and their balances
let users = {
    "jana": new User("jana", 1300.5),
    "swzen": new User("swzen", 2450.50),
    "zain": new User("zain", 800.25)
};

// Creating the Bank and ATM objects
let bank = new Bank(); 
let atm = new ATM(bank, users); 
let atm_Controller = new ATM_controller(users, atm) 

//________________________________________________________________
// Withdraw function that we'll call it when user hit the button
function withdraw() {
    const userName = document.getElementById("name").value;
    const withdrawAmount = parseFloat(document.getElementById("amount").value);

    if (!userName || isNaN(withdrawAmount) || withdrawAmount <= 0) { // "!userName" check if userName is not "", null or undefined
        alert("Please enter a valid name and withdraw amount.");
        return;
    }

    atm_Controller.perform_withdraw(userName, withdrawAmount);// here's where magic happen(line that operate the interface and make it interactive)
}
