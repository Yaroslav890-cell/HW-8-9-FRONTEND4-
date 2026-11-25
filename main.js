import { products } from "./data.js";
import productsTemplate from "./template.hbs";

const bookmarkInput = document.querySelector("#bookmarkInput");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
const bookmarkList = document.querySelector("#bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function renderBookmarks() {
  bookmarkList.innerHTML = "";

  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark;
    link.textContent = bookmark;
    link.target = "_blank";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.classList.add("edit");

    editBtn.addEventListener("click", () => {
      const newUrl = prompt("Введіть нове посилання:", bookmark);

      if (newUrl && newUrl.trim()) {
        bookmarks[index] = newUrl.trim();
        saveBookmarks();
        renderBookmarks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", () => {
      bookmarks.splice(index, 1);
      saveBookmarks();
      renderBookmarks();
    });

    li.append(link, editBtn, deleteBtn);
    bookmarkList.append(li);
  });
}

addBookmarkBtn.addEventListener("click", () => {
  const url = bookmarkInput.value.trim();

  if (!url) {
    alert("Введіть посилання!");
    return;
  }

  bookmarks.push(url);
  saveBookmarks();
  renderBookmarks();

  bookmarkInput.value = "";
});

renderBookmarks();





const username = document.querySelector("#username");
const surname = document.querySelector("#surname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");


username.value = localStorage.getItem("username") || "";
surname.value = localStorage.getItem("surname") || "";
email.value = localStorage.getItem("email") || "";
phone.value = localStorage.getItem("phone") || "";
password.value = localStorage.getItem("password") || "";

saveBtn.addEventListener("click", () => {
  localStorage.setItem("username", username.value);
  localStorage.setItem("surname", surname.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("phone", phone.value);
  localStorage.setItem("password", password.value);

  alert("Дані успішно збережені!");
});



const productsList = document.querySelector("#productsList");
const searchInput = document.querySelector("#searchInput");


fetch("./template.hbs")
  .then(response => response.text())
  .then(templateText => {
    const productsTemplate = Handlebars.compile(templateText);

    function renderProducts(productsArray) {
      productsList.innerHTML = productsTemplate({
        products: productsArray
      });
    }

    renderProducts(products);

    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();

      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
      );

      renderProducts(filteredProducts);
    });
  })
  .catch(error => console.error("Помилка завантаження шаблону:", error));


function renderProducts(productsArray) {
  productsList.innerHTML = productsTemplate({
    products: productsArray
  });
}

renderProducts(products);

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );

  renderProducts(filteredProducts);
});
