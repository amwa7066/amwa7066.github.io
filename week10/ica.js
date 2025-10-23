// 1. Select elements
const newQuoteButton = document.querySelector('#js-new-quote');
const quoteText = document.querySelector('#js-quote-text');
const answerText = document.querySelector('#js-answer-text');
const duckImage = document.createElement('img');
duckImage.id = 'duck-img';
duckImage.style.width = '100%';
duckImage.style.borderRadius = '8px';
duckImage.style.marginTop = '15px';

// 2. Add event listener for button click
newQuoteButton.addEventListener('click', getQuote);

// 3. API endpoints
const triviaEndpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';
const duckEndpoint = 'https://random-d.uk/api/v2/random';

// 4. Get Trivia
async function getQuote() {
  console.log("Fetching trivia and duck image...");
  
  try {
    const triviaResponse = await fetch(triviaEndpoint);
    const duckResponse = await fetch(duckEndpoint);

    if (!triviaResponse.ok || !duckResponse.ok) {
      throw new Error("API error");
    }

    const triviaData = await triviaResponse.json();
    const duckData = await duckResponse.json();

    displayQuote(triviaData.question, triviaData.answer, duckData.url);

  } catch (error) {
    console.error("Error:", error);
    alert("Oops! Could not load trivia or duck. Try again!");
  }
}

// 5. Display trivia + duck
function displayQuote(question, answer, duckUrl) {
  quoteText.textContent = question;
  answerText.textContent = "";
  
  // Add duck image
  const quotesSection = document.querySelector('.quotes');
  duckImage.src = duckUrl;
  if (!quotesSection.contains(duckImage)) {
    quotesSection.appendChild(duckImage);
  }

  // Show answer when button clicked
  const answerButton = document.querySelector('#js-tweet');
  answerButton.onclick = () => {
    answerText.textContent = answer;
  };
}

// 6. Run on load
document.addEventListener('DOMContentLoaded', getQuote);
