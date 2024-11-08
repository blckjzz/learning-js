import './ShoppingCart.js';
console.log(`Importing module`);

const getLastPost = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return { title: data.at(-1).title, body: data.at(-1).body };
};

const post = await getLastPost();
console.log(post);

import 'core-js/stable';
