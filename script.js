const bookList = [];

function registerBook() {
    const category = document.getElementById("category").value;
    const bookname = document.getElementById("bookname").value;
    const bookprice = document.getElementById("bookprice").value;

    if (!category || !bookname || !bookprice) {
        alert("모든 내용을 작성해 주세요/.");
        return;
    }

    const existingBook = bookList.find(book => book.category === category && book.bookname === bookname);
    if (existingBook) {
        alert("같은 카테고리 언어 동일한 책이 중복되어 있습니다.");
        return;
    }

    const newBook = {
        id: bookList.length + 1,
        category,
        bookname,
        price: parseInt(bookprice)
    };
    bookList.push(newBook);
    renderBookList();
    document.querySelector("form").reset();
}

function renderBookList() {
    const tbody = document.getElementById("book-list-tbody");
    tbody.innerHTML = "";
    bookList.forEach((book) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${book.id}</td>
            <td>${book.category}</td>
            <td>${book.bookname}</td>
            <td>${book.price}</td>
            <td><button onclick="deleteBook(${book.id})">삭제</button></td>
        `;
        tbody.appendChild(tr);
    });
}
function deleteBook(bookId) {
  const bookIndex = bookList.findIndex(book => book.id === bookId);
  if (bookIndex > -1) {
      bookList.splice(bookIndex, 1);
      renderBookList();
  }
}
document.getElementById("sort-select").addEventListener("change", function() {
    const sortType = this.value;
    if (sortType === "ascending") {
        bookList.sort((a, b) => a.price - b.price);
    } else if (sortType === "descending") {
        bookList.sort((a, b) => b.price - a.price);
    }
    renderBookList();
});
document.getElementById("search-btn").addEventListener("click", function() {
  const searchKeyword = document.getElementById("search-input").value.toLowerCase();
  if (!searchKeyword) {
      alert("검색어를 입력하세요.");
      return;
  }

  const filteredBooks = bookList.filter(book => book.bookname.toLowerCase().includes(searchKeyword));
  renderFilteredBookList(filteredBooks);
});

function renderFilteredBookList(filteredBooks) {
  const tbody = document.getElementById("book-list-tbody");
  tbody.innerHTML = "";
  filteredBooks.forEach((book) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
          <td>${book.id}</td>
          <td>${book.category}</td>
          <td>${book.bookname}</td>
          <td>${book.price}</td>
          <td><button onclick="deleteBook(${book.id})">삭제</button></td>
      `;
      tbody.appendChild(tr);
  });
}
