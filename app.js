const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(
  new Book("Lord of the Rings", "J.R.R. Tolkien", 500, "completed"),
);
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 270, "completed"));

const containerElement = document.querySelector(".container");
let libraryElement = document.querySelector(".library");

function addBookToPage(book) {
  const bookElement = document.createElement("div");

  const titleElement = document.createElement("div");
  const authorElement = document.createElement("div");
  const pagesElement = document.createElement("div");
  const readElement = document.createElement("div");
  const removeButton = document.createElement("button");

  removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

  bookElement.classList.add("book");
  titleElement.classList.add("title");
  authorElement.classList.add("author");
  pagesElement.classList.add("pages");
  readElement.classList.add("read");

  removeButton.classList.add("remove-button");
  removeButton.setAttribute("data-book-id", book.id);

  removeButton.addEventListener("click", () => {
    let result_index = myLibrary.reduce((result_index, book, index) => {
      if (removeButton.dataset.bookId === book.id) {
        result_index = index;
      }
    });

    myLibrary.splice(result_index, 1);
    bookElement.remove();
  });

  titleElement.textContent = book.title;
  authorElement.textContent = `${book.author}`;
  pagesElement.textContent = `${book.pages} pages`;

  if (book.read === "completed") {
    readElement.textContent = "Completed";
    readElement.classList.add("completed");
  } else {
    readElement.textContent = "Not Read";
    readElement.classList.add("not-completed");
  }

  bookElement.append(
    titleElement,
    authorElement,
    pagesElement,
    readElement,
    removeButton,
  );

  libraryElement.appendChild(bookElement);
}

function setupLibrary() {
  for (let book of myLibrary) {
    addBookToPage(book);
  }
}

setupLibrary();

const dialogElement = document.querySelector("dialog");

const formSubmitButton = document.querySelector(".book-submit");
const closeButton = document.querySelector(".close");

const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");

const form = document.forms[0];
const radios = form.elements["read"];

formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!Number.isInteger(Number(pagesField.value)) || pagesField.value < 0) {
    const errorText = document.createElement("div");
    errorText.classList.add("error");
    errorText.textContent = "Pages must be a Positive Integer";
    pagesField.parentElement.appendChild(errorText);
    return;
  }

  const book = new Book(
    titleField.value,
    authorField.value,
    pagesField.value,
    radios.value,
  );

  addBookToLibrary(book);
  addBookToPage(book);

  dialogElement.close();
  form.reset();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();

  dialogElement.close();
});
