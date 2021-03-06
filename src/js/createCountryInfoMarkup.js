export function createCountryInfoMarkup({ flags, name, capital, population, languages }) {
    return `
        <div class="country-info__field">
            <img class="country-info__img" src="${flags.svg}" />
            <span class="country-info__title">
                ${name.official}
            </span>
        </div>
        <div class="country-info__field">
            <p class="country-info__text">
                <span class="country-info__prop-name">Capital:</span>${capital[0]}</p>
        </div>
        <div class="country-info__field">
            <p class="country-info__text">
                <span class="country-info__prop-name">Population:</span>${population}</p>
        </div>
        <div class="country-info__field">
            <p class="country-info__text">
                <span class="country-info__prop-name">Languages:</span>${getLanguages(languages)}</p>
        </div>
    `;

    function getLanguages(languages) {
        return Object.values(languages).reduce((all, lenguage, index) => {
            if (index > 0) {
                return `${all}, ${lenguage}`;
            } else {
                return lenguage;
            }
        }, "");
    }
}