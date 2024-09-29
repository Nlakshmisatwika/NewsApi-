let articles = [];
let currentIndex = 0;

document.getElementById("fetchNewsBtn").addEventListener("click", fetchNews);

function fetchNews() {
  const apiKey = 'be9e7913abb549bab7e92604ab1dfe19';
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  if (articles.length === 0) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        articles = data.articles;
        displayArticle();
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        document.getElementById("newsContainer").innerHTML = "<p>Failed to load news.</p>";
      });
  } else {
    displayArticle();
  }
}

function displayArticle() {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = ''; // Clear previous article

  if (currentIndex < articles.length) {
    const article = articles[currentIndex];
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article', `bg-${currentIndex % 4}`); // Assign a background color

    newsArticle.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(newsArticle);
    currentIndex++;
  } else {
    newsContainer.innerHTML = "<p>No more articles to display.</p>";
  }
}
