import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('input[id="search-box"]'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.searchBox.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY))

function inputSearch(e) {
    if (e.target.value.trim() !== '') {
        fetchCountries(e.target.value.trim())
            .then(data => {
                if (data.length > 10) {
                    clearMarkup()
                    Notify.info('Too many matches found. Please enter a more specific name.', {position: "center-top"});
                } else if (data.length > 1) {
                    refs.countryInfo.innerHTML = "";
                    createListOfCounriesBySearch(data);
                } else {
                    refs.countryList.innerHTML = "";
                    createCardCounrieBySearch(data[0]);
                }
            })
            .catch(error => {
                clearMarkup()
                Notify.failure('Oops, there is no country with that name', {position: "center-top"})
            });
    } else {
        clearMarkup()
    }
};

// Створити список країн
function createListOfCounriesBySearch(countrys) {
    const markup = countrys.map(country => `<li class="item"><img class="img" src="${country.flags.svg}" alt="flag ${country.name}"> <p class="name-countrie">${country.name}</p></li>`).join("");
    refs.countryList.innerHTML = markup;
};

//Створити карточку країни
function createCardCounrieBySearch(country) {
    const markup = `
    <img class="img" src="${country.flags.svg}" alt="flag ${country.name}">
    <h1 style="display: inline">${country.name}</h1>
    <p><span>Capital:</span> ${country.capital}</p>
    <p><span>Poplation:</span> ${country.population}</p>
    <p><span>Languages:</span> ${country.languages.map(lang => lang.name).join(', ')}</p>
    `;
    refs.countryInfo.innerHTML = markup;
};

function clearMarkup() {
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = "";
}




