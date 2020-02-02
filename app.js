// Book Constructor creates an object of book entered when called
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI Constructor is initially empty and will hold new prototype functions to manipulate the data
function UI() {}

// this prototype is added to the UI constructor and removes the book by the .remove method.
UI.prototype.deleteBook = function(target) {
  // check to see if classname is = to delete and remove if so
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//this prototype clears the input fields after a book is submitted by setting their value to ''
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// this prototype adds the book object to the ui list

UI.prototype.addBookToList = function(book) {
  // assign the locations by grabbing the parent and adding a row
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  // Add td for each input and using row.innerHtml to add to the ui. Add a last in an a tag to remove it.
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

  // add the row to the list by using appendchild
  list.appendChild(row);
};

/* this prototype alerts the message passed in and uses 
the class to determine the color of the alert the alert 
is placed inside the container before the form tag by 
using .insertBefore*/

UI.prototype.showAlert = function(message, className) {
  div = document.createElement("div");
  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

/* Event Listeners
 this assigns bookForm and when the submit is 
 clicked it uses the Book constructor to make 
 an object of the data entered on the form.*/

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function(e) {
  //get data from form when submit is pressed
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  /*   the if statement checks to make sure required fields 
  have it then calls the showAlert prototype and passes it 
  the appropriate message and class name. */

  if (title === "" || author === "") {
    ui.showAlert("Title and Author Are required data", "error");
  } else {
    ui.addBookToList(book);

    ui.showAlert("Book has succesfully added", "success");

    //clear input fields
    ui.clearFields();
  }

  e.preventDefault();
});

/*This is the click handler that passes e.target to the prototype 
it the alerts user of the successful removal.*/

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book has been removed", "success");
  e.preventDefault();
});
