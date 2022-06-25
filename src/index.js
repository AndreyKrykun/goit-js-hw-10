import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/fetchCountries';
import { createCountryListMarkup } from './js/createCountryListMarkup';
import { createCountryInfoMarkup } from './js/createCountryInfoMarkup';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(event => onSearchInput(event), DEBOUNCE_DELAY));

function onSearchInput(event) {
    event.preventDefault();

    const value = event.target.value.trim();

    if (!value) {
        clearMarkup();
        return;
    }

    fetchCountries(value)
        .then(showCountries)
        .catch(absenceCountries);
}

function clearMarkup() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}
//
function showCountries(countries) {
    clearMarkup();
    const amount = countries.length;
  
    if (amount > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    };
   
    if (amount > 1) {
        refs.countryList.innerHTML = createCountryListMarkup(countries);
        return;
    };
 
    refs.countryInfo.innerHTML = createCountryInfoMarkup(countries[0]);
    return;
}

function absenceCountries(error) {
    if (error.message === '404') {
        Notify.failure('Oops, there is no country with that name');
    } else {
        Notify.failure(error);
    };
}
