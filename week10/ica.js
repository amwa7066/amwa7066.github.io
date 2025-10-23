const duckBtn = document.getElementById('duck-button');
const duckImg = document.getElementById('duck-image');
const duckStatus = document.getElementById('duck-status');

async function getDuck() {
  duckBtn.disabled = true;
  duckStatus.textContent = "Loading duck...";
  duckImg.style.opacity = 0;

  try {
    const res = await fetch('https://corsproxy.io/?https://random-d.uk/api/v2/random');
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    duckImg.src = data.url;
    duckImg.style.display = "block";
    duckImg.onload = () => {
      duckImg.style.opacity = 1;
    };
    duckStatus.textContent = "QUACK QUACK";
  } catch (error) {
    duckStatus.textContent = "Couldn't load duck. Try again.";
    console.error("Duck fetch error:", error);
  } finally {
    duckBtn.disabled = false;
  }
}

duckBtn.addEventListener('click', getDuck);
