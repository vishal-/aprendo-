import type { FProblem } from "../constants/general.interfaces";

export const getFlagProblem = (
  countries: string[],
  selectedCountries: string[]
): FProblem => {
  const getCountry = (
    countries: string[],
    selectedCountries: string[]
  ): string => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    if (selectedCountries.includes(country)) {
      return getCountry(countries, selectedCountries);
    }

    return country;
  };

  const country = getCountry(countries, selectedCountries);
  const options = [country];

  while (options.length < 6) {
    const option = countries[Math.floor(Math.random() * countries.length)];
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    country,
    answer: "",
    options
  };
};
