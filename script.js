/*
- https://api.quotable.io/search/quotes?query=edison 
- https://picsum.photos/200
- https://api.quotable.io/random
*/

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

setRandomColor = () => document.body.style.backgroundColor = getRandomColor();

const getQuote = async () => {
    const isFilterEnabled = document.querySelector('#enable-search').checked;
    let quote;
    if (isFilterEnabled)
        quote = await getFilteredQuote();
    else
        quote = await getRandomQuote();
    document.querySelector('#random-quote').innerText = quote;
}

const fetchData = async url => {
    try {
        const res = await fetch(url)
        return await res.json();
    } catch (err) {
        throw new Error('Error: faield to fetch data:', err);
    }
}

const getFilteredQuote = async () => {
    const searchText = document.querySelector('#search').value;
    const safeSearchText = encodeURIComponent(searchText);
    const data = await fetchData(`https://api.quotable.io/search/quotes?query=${safeSearchText}`)
    return data.results[0].content;
}

const getRandomQuote = async () => {
    const isFilterEnabled = document.querySelector('#enable-search').checked;
    if (isFilterEnabled) return getFilteredQuote();
    const data = await fetchData('https://api.quotable.io/random')
    return data.content;
}

const setRandomImage = () => {
    document.querySelector('#random-image').setAttribute('src', "https://picsum.photos/200?time=" + new Date().getTime())
}

const setData = async () => {
    getQuote();
    setRandomColor();
    setRandomImage();
}
setData();

const handleToggleFilter = (e) => {
    const textBox = document.querySelector("#search")
    const enableSearch = document.querySelector("#enable-search")
    textBox.disabled = enableSearch.checked ? "" : "disabled"
    document.querySelector('#search-button').innerText = enableSearch.checked ? "Filter" : "Random"
}