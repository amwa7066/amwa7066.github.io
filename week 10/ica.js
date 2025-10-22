// 1. Select the "new quote" button
const newQuoteButton = document.querySelector('#js-new-quote');

// 2. Add event listener for button click
newQuoteButton.addEventListener('click', getQuote);

// 3. API endpoint
const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

// 4. Define the getQuote function
async function getQuote() {
  console.log("Button clicked! Fetching trivia...");

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    // Display the question and prepare answer
    displayQuote(data.question, data.answer);

  } catch (error) {
    console.error("Error fetching trivia:", error);
    alert("Oops! Could not load trivia. Please try again.");
  }
}

// 5. Define displayQuote function
function displayQuote(question, answer) {
  const quoteText = document.querySelector('#js-quote-text');
  const answerText = document.querySelector('#js-answer-text');

  // Show the question
  quoteText.textContent = question;

  // Hide the answer until user clicks button
  answerText.textContent = "";

  const answerButton = document.querySelector('#js-tweet');
  answerButton.onclick = () => {
    answerText.textContent = answer;
  };
}

// 6. Run getQuote automatically when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("Page loaded — fetching initial trivia...");
  getQuote();
});
