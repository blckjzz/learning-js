'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// movements.forEach(element => {
//   console.log(element);
// });

// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr);
// console.log(arr.slice(-1));

// console.log(arr.at(-1));

// movements.forEach((movement, index, array) => {
//   if (movement > 0) {
//     console.log(`${index + 1} # Você depositou: ${movement}`);
//   } else {
//     console.log(`${index + 1} # Você sacou: ${movement}`);
//   }
// });

// currencies.forEach((value, key, map) => {
//   console.log(`${key} - ${value}`);
// });

/* conversion rates */
const euroToUsd = 1.1;
const usdToEuro = 0.9;

const euroToUsdTransactions = movements.map(mov => mov * euroToUsd);

const displayMovements = function (movements) {
  // console.log(movement);
  containerMovements.innerHTML = '';
  movements.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
                <div class="movements__row">
                    <div class="movements__type movements__type--${type}">${i} ${type}</div>
                    <div class="movements__value">${movement}€</div>
                </div>
                `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const accountHistory = movements.map(
  (mov, i) => `${i + 1} # you ${mov > 0 ? 'deposited' : 'withdrew'}: ${mov}`
);

const createUsernames = function (accs) {
  // console.log(accs);
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(owner => owner[0])
      .join('');
  });
};

createUsernames(accounts);

const displaySumary = function (account) {
  const inValues = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outValues = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = account.movements
    .filter(interest => interest > 0)
    .map(deposit => (deposit * account.interestRate) / 100, 0)
    .filter((interest, i, arr) => interest >= 1)
    .reduce((sum, interest) => sum + interest);
  labelSumIn.textContent = `${inValues}€`;
  labelSumOut.textContent = `${Math.abs(outValues)}€`;
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// console.log(createUsernames(accounts));
// // console.log(movements);
// // console.log(euroToUsdTransactions);
// // console.log(accountHistory);
const displayBalance = function (movements) {
  const b = movements.reduce((sum, curr, i, arr) => sum + curr);
  labelBalance.textContent = `${b}€`;
};

// console.log(credentials);
// const passw = accounts.find(acc => acc.pin === password);
// console.log(accounts.find(acc => acc.username === login));
// add event listener to form

let promptPasswd;
let promptLogin;
let currentAccount;
// console.log(accounts);
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(acc => acc.username === promptLogin);
  promptLogin = inputLoginUsername.value;
  promptPasswd = Number(inputLoginPin.value);
  // console.log(promptLogin);
  // console.log(promptPasswd);
  // check input and compare with accounts
  if (currentAccount?.pin === promptPasswd) {
    // correct, login.
    console.log(currentAccount);
    console.log(
      `credentials correct, welcome ${currentAccount.owner.split(' ')[0]}!`
    );
    // display welcome message
    labelWelcome.textContent = `Welcome, ${
      currentAccount.owner.split(' ')[0]
    }!`;

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    // display movements
    containerApp.style.opacity = 100;
    displayMovements(currentAccount.movements);
    // display summary
    displaySumary(currentAccount);
    // display current balance
    displayBalance(currentAccount.movements);
  } else {
    console.log(`wrong credentials. try again!`);
  }
});

// transfer

const calculateBalance = account => {
  return account.movements.reduce((sum, curr, i, arr) => sum + curr);
  // console.log(`current balance of ${account.username} is: ${balance} x`);
};
// console.log('conta atual:');
// console.log(currentAccount);
// console.log('-----------');
// let balance = calculateBalance(currentAccount);

// money transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(currentAccount);
  const NumberAccountDestination = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  console.log(`Destination: ${NumberAccountDestination} # value: ${amount}`);
  let balance = calculateBalance(currentAccount);
  console.log(`current balance of ${currentAccount.username} is: ${balance}`);
  // verify if the sender has enough balance
  if (balance > 0 && balance >= amount) {
    // verify if the destination account exists;
    let destinationAccount = accounts.find(
      account => account.username === NumberAccountDestination
    );
    console.log(
      `You want to send ${amount} to ${destinationAccount.owner}, with the username: ${destinationAccount.username}?`
    );
    console.log(
      `The value of: ${amount * -1} will be deducted from your balance.`
    );
    console.log(
      `The value of: ${amount} will added to ${destinationAccount.owner}'s balance.`
    );
    // deduct the value from current account (sender)
    currentAccount.movements.push(amount * -1);
    // add amount to destination account (recipient)
    destinationAccount.movements.push(amount);
    console.log(
      `now your current balance is: ${calculateBalance(currentAccount)}`
    );
    displayMovements(currentAccount.movements);
    // display summary
    displaySumary(currentAccount);
    // display current balance
    displayBalance(currentAccount.movements);
  } else {
    console.log(
      `The amount can not be transfered. The current balance is ${balance} and amount you want to transfer is: ${amount}`
    );
  }

  // verify if account exits
  // send the money
  // deduct the money from balance
});
// let transferDestination = ;
