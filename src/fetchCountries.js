// const URL = 'https://restcountries.com/v2';
const URL = 'https://restcountries.com/v2/name/';
const searchParams = 'fields=name;fields=capital;fields=population;fields=flags;fields=languages';
export const fetchCountries = (name) => fetch(URL + name + '?' + searchParams)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
    });
