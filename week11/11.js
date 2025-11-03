async function searchBooks() {
  const query = document.getElementById("searchInput").value;
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayResults(data.docs.slice(0, 10));
  } catch {
    document.getElementById("results").innerHTML = "Error fetching data.";
  }
}

function displayResults(books) {
  const container = document.getElementById("results");
  container.innerHTML = "";
  books.forEach(book => {
    const item = document.createElement("div");
    item.innerHTML = `
      <p><strong>${book.title}</strong> by ${book.author_name ? book.author_name[0] : "Unknown"}
      <button onclick='saveFavorite("${book.title.replace(/"/g, '')}")'>Save</button></p>`;
    container.appendChild(item);
  });
}

function saveFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(title)) favorites.push(title);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  showFavorites();
}

function showFavorites() {
  const list = document.getElementById("favorites");
  list.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    list.appendChild(li);
  });
}

function exportFavorites() {
  const favorites = localStorage.getItem("favorites");
  const blob = new Blob([favorites], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "favorites.json";
  link.click();
}

function clearFavorites() {
  localStorage.removeItem("favorites");
  showFavorites();
}

showFavorites();
