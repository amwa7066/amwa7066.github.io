const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('show');
  });

  navToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navToggle.click();
    }
  });
}

function setTheme(theme) {
  localStorage.setItem('userTheme', theme);
  document.body.className = theme;
}

window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('userTheme') || 'light';
  document.body.className = savedTheme;
});
function clearData() {
  localStorage.clear();
  document.body.className = 'light'; 
  alert("Your saved data has been cleared.");
}
function setTheme(theme) {
  const data = { value: theme, saved: Date.now() };
  localStorage.setItem('userTheme', JSON.stringify(data));
  document.body.className = theme;
}

window.addEventListener('load', () => {
  const saved = JSON.parse(localStorage.getItem('userTheme'));
  if (saved && Date.now() - saved.saved < 1000*60*60*24*30) {
    document.body.className = saved.value;
  } else {
    document.body.className = 'light';
    localStorage.removeItem('userTheme');
  }
});

window.addEventListener('load', () => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    document.querySelector(".site-header p").textContent = `Welcome back, ${savedName}!`;
  }
});
