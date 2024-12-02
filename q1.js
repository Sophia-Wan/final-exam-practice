const { log } = require("console");
const { read } = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
/*
Create a simple library management application with the following features:

1) Allow users to register books by entering the book title. Store this information in an array.
2) Using the libraryCard object, assign "borrow" as one of the key and have it's value default to false. When the user uses the command "borrow", toggle it. A user can only register books if borrow is true.
3) List all the books registered under your array

CHALLENGE 1: The same book cannot be borrowed twice. So if a user tried to borrow a book that's already in the array, deny them

CHALLENGE 2: Make it so that the user can return their books with a "return" command. Returning books means the book registry is an empty array again.

Planning
- if user wants to register a book they type add and we can use the readline question -> .push users response
- if user want a list we can use for(let b=0; b< bookRegistry.length; b++)
- to toggle the borrow function we can use libraryCard.borrow = !libraryCard.borrow
  - then users can toggle with the word borrow, and can borrow books depending on that
Challenge 1:
- if user tries to borrow a book a second time,
    - create new let function that stores the borrowed books into an array
    - use borrowedBooks.includes(input) to see if they have already borrowed the book or not
Challenge 2:

*/

let bookregistry = [];
let libraryCard = {
  borrow: false
  //library card setting goes here
};

let borrowedBooks=[];

//rename this to RegisterBook
function RegisterBook(){
  readline.question("What book would you like to add?", newBook => {
    bookregistry.push(newBook);
    console.log(`You have added ${newBook}!`);
    StartApp();
  })
  //ask for the book title with readline
}

//rename this to ToggleBorrow
function ToggleBorrow() {
  if(libraryCard.borrow === true) {
    readline.question(`Which book would you like to borrow? `, input => {
      if (borrowedBooks.includes(input)) {
        console.log(`Sorry, you've already borrowed "${input}".`);
      } else if (bookregistry.includes(input)) {
        borrowedBooks.push(input);
        console.log(`${input} is now being borrowed.`);
      } else {
        console.log(`Sorry, we don't have that book.`);
      }

      StartApp();
    });
  } else { 
    console.log("you do not have permission to borrow!");
    StartApp();
 }
  //toggle borrow setting
}

//rename this to ListBooks
function listBooks(){
  if (bookregistry === 0){
    console.log("there are no books registered!");
  } else {
  for(let b=0; b < bookregistry.length; b++) {
    console.log(`here are all the books in the system: ${bookregistry[b]}`);
  } }
  StartApp();
  //go through the array to list all the books
} 


function ReturnBooks() {
  readline.question("What book would you like to return?", _return => {
if (borrowedBooks.includes(_return)) {
  console.log(`${_return} has been returned!`);
  borrowedBooks.shift(_return)
  bookregistry.shift(_return)
  StartApp();
}
  })

}

function StartApp(){
  readline.question("What is your command? ", _command=>{
    if(_command === "quit"){
      readline.close();
    } else if(_command === "add"){
      RegisterBook();
    } else if(_command === "list") {
      listBooks();
    } else if(_command === "get book"){
      ToggleBorrow();
    } else if(_command === "borrow"){
      libraryCard.borrow = !libraryCard.borrow
      StartApp();
    } else if (_command === "return") {
      ReturnBooks();
    } else{
      StartApp();
    }
  })
}

StartApp();
