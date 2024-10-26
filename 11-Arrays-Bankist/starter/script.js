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

const displayMovements = function (movements, sorted = false) {
  // console.log(movement);

  containerMovements.innerHTML = '';

  const movs = sorted
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : movements;

  movs.forEach((movement, i) => {
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
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, sorted);
  sorted = !sorted;
});

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

const updateUI = () => {
  displayMovements(currentAccount.movements);
  // display summary
  displaySumary(currentAccount);
  // display current balance
  displayBalance(currentAccount.movements);
};

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
    // console.log(currentAccount);
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
    updateUI();
  } else {
    console.log(`wrong credentials. try again!`);
  }
});

// transfer

const calculateBalance = account => {
  return account.movements.reduce((sum, curr, i, arr) => sum + curr);
  // console.log(`current balance of ${account.username} is: ${balance} x`);
};

const verifyAccount = (account, account2, pin) => {
  let acc = accounts.find(account => account.username === account2);
  if (acc.pin === pin) {
    return acc;
  } else {
    return null;
  }
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(currentAccount);
  const NumberAccountDestination = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  console.log(`Destination: ${NumberAccountDestination} # value: ${amount}`);
  let balance = calculateBalance(currentAccount);
  console.log(`current balance of ${currentAccount.username} is: ${balance}`);
  let destinationAccount = accounts.find(
    account => account.username === NumberAccountDestination
  );
  // verify if the sender has enough balance
  console.log(currentAccount.pin !== destinationAccount.pin ? 'yes' : 'no');
  if (currentAccount.pin !== destinationAccount.pin) {
    // only if sender and destination are different, otherwise, block it.
    if (balance > 0 && balance >= amount && destinationAccount?.pin) {
      // verify if the destination account exists;

      confirm(
        `You want to send ${amount} to ${destinationAccount.owner}, with the username: ${destinationAccount.username}?`
      );
      // console.log(
      //   `The value of: ${amount * -1} will be deducted from your balance.`
      // );
      alert(
        `The value of: ${amount} will added to ${destinationAccount.owner}'s balance.`
      );
      // deduct the value from current account (sender)
      currentAccount.movements.push(amount * -1);
      // add amount to destination account (recipient)
      destinationAccount.movements.push(amount);
      console.log(
        `now your current balance is: ${calculateBalance(currentAccount)}`
      );
      updateUI();
    } else {
      console.log(
        `The amount can not be transfered. Check if the account you want to send exists.`
      );
      console.log(
        `The current balance is ${balance} and amount you want to transfer is: ${amount}`
      );
    }

    // verify if account exits
    // send the money
    // deduct the money from balance
  } else {
    alert(`The destination account can not be yourself.`);
    inputTransferTo.blur();
  }
});
// let transferDestination = ;

// remove account
// check if the account to be removed belong to the current logged user
// check if given pin matches the account's pin
// remove account from the array of accounts

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked');
  console.log(inputCloseUsername.value);
  console.log(inputClosePin.value);

  let acc = verifyAccount(
    currentAccount,
    inputCloseUsername.value,
    Number(inputClosePin.value)
  );

  let indexAccountToRemove = accounts.findIndex(
    arr => arr.username === acc.username
  );

  // console.log(acc.username === accountToRemove);
  console.log(indexAccountToRemove);

  accounts.splice(indexAccountToRemove, 1);
  alert(`The ${acc.username} was removed!`);
  inputCloseUsername.value = inputClosePin.value = '';
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
});

// loan request

btnLoan.addEventListener('click', function (e) {
  // check if the amount request is 10% of any deposit ever made by the current user
  // if yes, loan will be approved.
  // if no, denied.

  e.preventDefault();
  console.log(inputLoanAmount.value);
  let loan = Number(inputLoanAmount.value);
  let isLoanApproved = currentAccount.movements.some(mov => mov >= loan * 0.1);
  if (isLoanApproved) {
    currentAccount.movements.push(loan);
    updateUI();
  } else {
    alert(
      `You might try requesting a lower value, up to: ${
        Math.max(...currentAccount.movements) * 10
      }`
    );
  }

  // const deposit = mov => mov > 0;

  // console.log(currentAccount.movements.find(deposit));
  // console.log(currentAccount.movements.some(deposit));
  // console.log(currentAccount.movements.every(deposit));
});

// flat and flatmap

accounts.flatMap(mov => mov.movements).reduce((sum, arr) => sum + arr);
//

///////////////////////////////////////
// Coding Challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));

// console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

// console.log(dogs.find(dog => dog.owners.includes('Sarah')));

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
let toolitle = [];
let toomuch = [];
console.log(
  dogs.map(dog => {
    if (dog.curFood > dog.recommendedFood * 0.9) {
      toomuch.push(dog.owners);
    } else if (dog.curFood < dog.recommendedFood * 1.1) {
      toolitle.push(dog.owners);
    }
  })
);

console.log({ toolitle, toomuch });

console.log(toolitle.flat());

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:

// GOOD LUCK 😀
// */
