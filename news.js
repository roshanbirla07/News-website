const API_KEY = "5d9ef8e4b7d24b549ecb274a690d9866";
const newsURL = "https://newsapi.org/v2/everything?q=";
const cardsContainer = document.getElementById("cards-container");
const newsCardTemplate = document.getElementById("template-news-card");

window.addEventListener("load", () => fetchNews("World"));


function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${newsURL}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = document.importNode(newsCardTemplate.content, true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.textContent = `${article.source.name}: ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav=null;
function onClicknavItem(id){

    fetchNews(id);
    const navItems=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItems;
    curSelectedNav.classList.add("active");


}
const searchbutton=document.getElementById("search-btn");
const searchtext=document.getElementById('news-input');

searchbutton.addEventListener("click",()=>{
    const query=searchtext.value;
    if(!query)return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;

});
