class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBooktoList(book) {
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
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    // check to see if classname is = to delete and remove if so
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    for (let book of books) {
      const ui = new UI();
      ui.addBooktoList(book);
    }
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn,index) {
    const books = Store.getBooks();
    for (let book of books) {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
      localStorage.setItem('books',JSON.stringify(books))
    }
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks);

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
    ui.addBooktoList(book);

    Store.addBook(book);

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

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("Book has been removed", "success");
  e.preventDefault();
});
