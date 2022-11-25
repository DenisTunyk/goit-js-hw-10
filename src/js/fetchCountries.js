const URL = "https://restcountries.com/v3.1/name/"
const FIELDS = "fields=name,capital,population,flags,languages"

function fetchCountries(name) {
    return fetch(`${URL}${name}?${FIELDS}`).then(resp => {
        if (!resp.ok) {
            throw new Error("Oops, there is no country with that name");
        }
        return resp.json()
    });
}

export { fetchCountries };