const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.editStatus = function (status) {
  this.read = status;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

let editBookId = "";

addBookToLibrary(
  new Book("Lord of the Rings", "J.R.R. Tolkien", 500, "completed"),
);
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 270, "completed"));

const containerElement = document.querySelector(".container");
let libraryElement = document.querySelector(".library");

const editDialog = document.querySelector("#edit-dialog");
const editDropdown = document.querySelector("#select-status");

function addBookToPage(book) {
  const bookElement = document.createElement("div");
  const titleElement = document.createElement("div");
  const authorElement = document.createElement("div");
  const pagesElement = document.createElement("div");
  const readElement = document.createElement("div");
  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
  editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;

  bookElement.classList.add("book");
  titleElement.classList.add("title");
  authorElement.classList.add("author");
  pagesElement.classList.add("pages");
  readElement.classList.add("read");

  removeButton.classList.add("remove-button");
  removeButton.setAttribute("data-book-id", book.id);
  removeButton.ariaLabel = "Remove Book";

  editButton.classList.add("edit-button");
  editButton.setAttribute("data-book-id", book.id);
  editButton.ariaLabel = "Edit Read Status";

  removeButton.addEventListener("click", () => {
    const index = myLibrary.findIndex((b) => b.id === book.id);
    if (index !== -1) myLibrary.splice(index, 1);
    bookElement.remove();
  });

  editButton.addEventListener("click", () => {
    editBookId = editButton.dataset.bookId;
    editDialog.showModal();
    editDropdown.value = book.read;
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

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  buttonsContainer.append(editButton, removeButton);

  bookElement.append(
    titleElement,
    authorElement,
    pagesElement,
    readElement,
    buttonsContainer,
  );

  libraryElement.appendChild(bookElement);
}

function setupLibrary() {
  libraryElement.replaceChildren();

  for (let book of myLibrary) {
    addBookToPage(book);
  }
}

setupLibrary();

const dialogElement = document.querySelector("#book-dialog");
const closeButton = document.querySelector("#book-dialog .close");

const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");

const form = document.forms[0];
const radios = form.elements["read"];

form.addEventListener("submit", () => {
  const book = new Book(
    titleField.value,
    authorField.value,
    pagesField.value,
    radios.value,
  );

  addBookToLibrary(book);
  setupLibrary();
  form.reset();
});

closeButton.addEventListener("click", (e) => {
  dialogElement.close();
});

dialogElement.addEventListener("close", () => form.reset());

const editSubmitButton = document.querySelector(".edit-submit");

editSubmitButton.addEventListener("click", () => {
  let book = myLibrary.find((book) => book.id === editBookId);
  book.editStatus(editDropdown.value);
  setupLibrary();
});
