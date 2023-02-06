const form = document.querySelector("#js-search-form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    // prevent page reload when form is submitted 
    event.preventDefault();
    
    const inputValue = document.querySelector("#js-search-input").value; //  
    const searchQuery = inputValue.trim();// removing whitespaces

    const searchResult= document.querySelector('#js-search-results');
    searchResult.innerHTML='';

    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('hidden');
    
    try {
        const result = await searchWikipedia(searchQuery);
        displayResult(result)
    } catch (err) {
        console.log(err);
        //alert('failed to search wikipedia');
    } finally{
        spinner.classList.add('hidden');
    }
}

async function searchWikipedia(searchQuery) {
    const wikiLink = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}.`;
    const response = await fetch (wikiLink)

     if (!response.ok) {
         throw Error(response.statusText);
    } 
    const json = await response.json();
    return json;
}
function displayResult(result) {
    const searchResult = document.querySelector("#js-search-results");
    result.query.search.forEach(result => {
        const url= `https://en.wikipedia.org/?curid=${result.pageid}`;
        searchResult.insertAdjacentHTML(
            'beforeend',
            `<div class="result-item">
            <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}<a/>
            <span class="result-snippet">${result.snippet}<span><br>
            </div>`
            
            )
    });
}
