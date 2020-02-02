// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI Constructor
function UI() {}
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  console.log(list);
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
  list.appendChild(row);
};
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
// Event Listeners
const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function(e) {
  //get data from form when submit is pressed
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

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
