import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
    input: document.querySelector("#search-box"),
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
            
        }
        if (data.length == 1) {
            
        }
        console.log(data.length)
    }).catch(Notify.failure("Oops, there is no country with that name"));
    //console.log(arr.length);
}