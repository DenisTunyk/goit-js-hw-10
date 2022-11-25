import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info"),
}

ref.input.addEventListener("input", debounce(onFormInput, 300));

const DEBOUNCE_DELAY = 300;

//console.log(ref.input);
//console.log(fetchCountries("ukraine"));

function onFormInput() {
    let country = ref.input.value.trim();
    if (country === "") {
        return;
    }
    fetchCountries(country).then(data => {
        if (data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        }
        if ((data.length >= 2) && (data.length <= 10)) {
            //ref.list.insertAdjacentHTML('beforeend', createMarkupList(data));
            ref.info.innerHTML = "";
            ref.list.innerHTML = createMarkupList(data);
        }
        if (data.length === 1) {
            ref.list.innerHTML = "";
            ref.info.innerHTML = createMarkupInfo(data);
        }
        console.log(data.length)
    }).catch(err => {
        Notify.failure("Oops, there is no country with that name");
    });
    //console.log(arr.length);
}

function createMarkupList(arr) {
    return arr.map(({flags, name}) => `<li><img src="${flags.svg}" alt="${name.common}"><h3>${name.common}</h3></li>`)
}

function createMarkupInfo(arr) {
    //const values = Object.values(arr.languages);
    //console.log(arr.languages);
    return arr.map(({ flags, name, capital, population, languages }) => `
      <div class="country">
        <img src="${flags.svg}" alt="${name.common}" width="80"/>
        <h2>${name.common}</h2>
      </div>
      <div><b>Capital: </b>${capital}</div>
      <div><b>Population: </b>${population}</div>
      <div><b>Languages: </b>${Object.values(languages).map(item => ` ${item}`)}</div>
      `);
}