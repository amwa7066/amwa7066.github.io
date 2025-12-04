document.getElementById("searchBtn").addEventListener("click", searchBooks);

async function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  const status = document.getElementById("status");
  const resultsContainer = document.getElementById("results");

  if (!query) {
    status.textContent = "Please enter a search term.";
    return;
  }

  status.textContent = "Searching...";
  resultsContainer.innerHTML = "";

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data.docs.length) {
      status.textContent = "No results found.";
      return;
    }

    status.textContent = "";
    displayResults(data.docs.slice(0, 12));

    critiqueOverwhelmEffect(data.docs.length);

  } catch {
    status.textContent = "Error fetching data.";
  }
}


function displayResults(books) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/150?text=No+Cover";

    card.innerHTML = `
      <img src="${cover}" alt="${book.title} cover">
      <h3>${book.title}</h3>
      <p>${book.author_name ? book.author_name[0] : "Unknown Author"}</p>
      <button onclick="saveFavorite('${book.title.replace(/'/g, "")}')">Save ❤️</button>
    `;

    container.appendChild(card);
  });
}


// --- FAVORITES ---
function saveFavorite(title) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.includes(title)) favs.push(title);
  localStorage.setItem("favorites", JSON.stringify(favs));
  showFavorites();
}

function showFavorites() {
  const list = document.getElementById("favorites");
  list.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];

  favs.forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    list.appendChild(li);
  });
}

document.getElementById("exportBtn").onclick = () => {
  const favs = localStorage.getItem("favorites") || "[]";
  const blob = new Blob([favs], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "favorites.json";
  link.click();
};

document.getElementById("clearBtn").onclick = () => {
  localStorage.removeItem("favorites");
  showFavorites();
};

showFavorites();


function critiqueOverwhelmEffect(resultCount) {
  const explore = document.getElementById("explore");

  if (resultCount > 50) {
    explore.classList.add("overwhelm");
  } else {
    explore.classList.remove("overwhelm");
  }
}
