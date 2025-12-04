// TYPEWRITER EFFECT
const typeElements = document.querySelectorAll('.typewriter');
typeElements.forEach(el => {
const text = el.textContent;
el.textContent = '';
let i = 0;
function type() {
if (i < text.length) {
el.textContent += text.charAt(i);
i++;
setTimeout(type, 80);
}
}
type();
});

// Typewriter on JS page header text
const jsTarget = document.getElementById('jsType');
if (jsTarget) {
const jsText = "experimenting with javascript ✧";
let j = 0;
function typeJS() {
if (j < jsText.length) {
jsTarget.textContent += jsText.charAt(j);
j++;
setTimeout(typeJS, 90);
}
}
typeJS();
}

// LIGHT / DARK MODE
const toggleBtn = document.getElementById('modeToggle');
if (toggleBtn) {
toggleBtn.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});
}

// CURSOR SPARKLE TRAIL
document.addEventListener('mousemove', function(e) {
const sparkle = document.createElement('div');
sparkle.className = 'sparkle';
sparkle.style.left = e.pageX + 'px';
sparkle.style.top = e.pageY + 'px';
document.body.appendChild(sparkle);

setTimeout(() => {
sparkle.remove();
}, 500);
});