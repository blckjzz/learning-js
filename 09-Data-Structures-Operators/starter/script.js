// // // 'use strict';

// // // // Data needed for a later exercise
// // // const flights =
// // //   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // // // Data needed for first part of the section
// // const restaurant = {
// //   name: 'Classico Italiano',
// //   location: 'Via Angelo Tavanti 23, Firenze, Italy',
// //   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
// //   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// //   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

// //   openingHours: {
// //     thu: {
// //       open: 12,
// //       close: 22,
// //     },
// //     fri: {
// //       open: 11,
// //       close: 23,
// //     },
// //     sat: {
// //       open: 0, // Open 24 hours
// //       close: 24,
// //     },
// //   },

// //   delivery: function ({ address, orderIndex, time = null }) {
// //     console.log(
// //       `You ordered ${this.mainMenu[orderIndex]}, and it will be delivered to ${address} at ${time}. Thanks for chosing us!`
// //     );
// //   },
// // };

// // restaurant.delivery({
// //   // time: '10:30h',
// //   address: 'Hauptstraße 36, Berlin',
// //   orderIndex: 1,
// // });

// // const x = [1, 2, 3, 4];
// // const [z, , rt] = x;

// // console.log(z, rt);

// // const { name: newObjName } = restaurant;

// // console.log(newObjName);

// // let string = 'a very long string';

// // console.log(...string);

// // function add(...numbers) {
// //   let sum = 0;
// //   for (let i = 0; i < numbers.length; i++) {
// //     sum += numbers[i];
// //   }
// //   console.log(sum);
// // }
// // const xx = [1, 3, 45, 5, 6, 7, 7, 8];
// // add(...xx);

// // const game = {
// //   team1: 'Bayern Munich',
// //   team2: 'Borrussia Dortmund',
// //   players: [
// //     [
// //       'Neuer',
// //       'Pavard',
// //       'Martinez',
// //       'Alaba',
// //       'Davies',
// //       'Kimmich',
// //       'Goretzka',
// //       'Coman',
// //       'Muller',
// //       'Gnarby',
// //       'Lewandowski',
// //     ],
// //     [
// //       'Burki',
// //       'Schulz',
// //       'Hummels',
// //       'Akanji',
// //       'Hakimi',
// //       'Weigl',
// //       'Witsel',
// //       'Hazard',
// //       'Brandt',
// //       'Sancho',
// //       'Gotze',
// //     ],
// //   ],
// //   score: '4:0',
// //   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// //   date: 'Nov 9th, 2037',
// //   odds: {
// //     team1: 1.33,
// //     x: 3.25,
// //     team2: 6.5,
// //   },
// // };

// // // Coding Challenge #1

// // /*
// // We're building a football betting app (soccer for my American friends 😅)!

// // Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// // 1. Create one player array for each team (variables 'players1' and 'players2')
// // 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// // 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// // 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// // 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// // 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// // 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// // TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// // // console.log(game.players[0], game.players[1]);
// // const [players1, players2] = game.players;
// // console.log(players1);
// // console.log(players2);
// // // const [gk, ...fieldPlayers] = players1;
// // // // console.log(gk, fieldPlayers);

// // // const tetNew = [...players1, ...players2];

// // // // // console.log(players1);
// // // // // console.log(players2);
// // // console.log(tetNew);

// // // const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// // // console.log(menu);

// // // for (const item of menu) {
// // //   console.log(item);
// // // }

// // for (const [i, el] of menu.entries()) {
// //   console.log(`${i + 1}: ${el}`);
// // }

// const game2 = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // Coding Challenge #2

// /*
// Let's continue with our football betting app!

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// GOOD LUCK 😀
// */

// console.log(game2);

// for (const [x, y] of game2.scored.entries()) {
//   console.log(`Goal ${x + 1} scored by ${y}`);
// }

// // for (odd of game2.odds) {
// //   console.log(`${odd}`);
// // }

// let avg = 0;
// for (const odd of Object.values(game2.odds)) {
//   avg += odd;
//   console.log(`Odd: ${odd}`);
// }
// console.log(`Avg:${avg / 3}`);

// // console.log(`Odd of victory ${(game2.team1, game2.team2)}: `);
// console.log('[==================]');

// for (const [team, odd] of Object.entries(game2.odds)) {
//   if (game2[team]) {
//     console.log(`Odd of victory ${game2[team]} is: ${odd}`);
//   }
// }

// // for (const [i, el] of menu.entries()) {
// //   console.log(`${i + 1}: ${el}`);

// /*
// ==============================
// */

// let restaurants = new Map();

// console.log(restaurants);

// ///////////////////////////////////////
// // Coding Challenge #3

// /*
// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀
// */

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // console.log(gameEvents);

// let events = [...new Set(gameEvents.values())];

// console.log(events);

// gameEvents.delete(64);
// console.log(
//   `An event happened, on average, every ${Math.floor(
//     90 / gameEvents.size
//   )} minutes"`
// );

// console.log(gameEvents);

// for (const [key, event] of [...gameEvents]) {
//   let time = key <= 45 ? 'before halftime' : 'after halftime';
//   console.log(`[${time}] - ${key} - ${event}`);
// }

/**
 *
 *
 */

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

breakText = function (text) {
  return [...text.split('+')];
};

result = breakText(flights);

// console.log(Object.entries(result));

const getCode = str => str.slice(0, 3).toUpperCase();

for (const [i, f] of Object.entries(result)) {
  // console.log(f);
  [message, departureFrom, arrivedIn, time] = f.split(';');

  message = new String(message).replaceAll('_', ' ').trim();

  console.log(
    `${message} from ${getCode(departureFrom)} to ${getCode(
      arrivedIn
    )} (${time})`
  );
}
// console.log(f);
// console.log(result);

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
