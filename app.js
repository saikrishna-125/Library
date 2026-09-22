const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Harry Potter", "ABC", 260, true);
addBookToLibrary("Harry Potter", "ABC", 260, true);
addBookToLibrary("Harry Potter", "ABC", 260, true);
addBookToLibrary("Harry Potter", "ABC", 260, false);

const libraryElement = document.querySelector(".library");

function displayBooks() {
  for (let book of myLibrary) {
    const bookElement = document.createElement("div");
    const titleElement = document.createElement("div");
    const authorElement = document.createElement("div");
    const pagesElement = document.createElement("div");
    const readElement = document.createElement("div");

    bookElement.classList.add("book");
    titleElement.classList.add("title");
    authorElement.classList.add("author");
    pagesElement.classList.add("pages");
    readElement.classList.add("read");

    titleElement.textContent = book.title;
    authorElement.textContent = `by ${book.author}`;
    pagesElement.textContent = `${book.pages} pages`;

    if (book.read) {
      readElement.textContent = "Completed";
      readElement.classList.add("completed");
    } else {
      readElement.textContent = "Not Read";
      readElement.classList.add("not-completed");
    }

    bookElement.append(titleElement, authorElement, pagesElement, readElement);
    libraryElement.appendChild(bookElement);
  }
}

displayBooks();
