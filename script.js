const API_KEY = "f8b660717emsh6fd35cdc12d0b76p14eee0jsnf972d87b6c81";
const url = "https://newsnow.p.rapidapi.com/newsv2";

const url2 = 'https://newsnow.p.rapidapi.com/newsv2';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'f8b660717emsh6fd35cdc12d0b76p14eee0jsnf972d87b6c81',
		'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
	},
	body: {
		query: 'AI',
		time_bounded: true,
		from_date: '01/02/2021',
		to_date: '05/06/2021',
		location: 'us',
		language: 'en',
		page: 1
	}
};


window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
const options = {
  method: 'POST',
  url: 'https://newsnow.p.rapidapi.com/newsv2',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'f8b660717emsh6fd35cdc12d0b76p14eee0jsnf972d87b6c81',
    'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
  },
  data: {
    query: 'AI',
    time_bounded: true,
    from_date: '01/02/2021',
    to_date: '05/06/2021',
    location: 'us',
    language: 'en',
    page: 1
  }
};

try {
	const response = await axios.request(options);
    bindData(response.data.news);
} catch (error) {
	console.error(error);
}
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        console.log('hello')
        // if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.images[0];
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.text.slice(0, 150)}...`;

    const date = new Date(article.date).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = ` ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})