const USE_MEALS_TOKEN = 'mealsToken';
const USE_COCKTIL_TOKEN = 'cocktailsToken';
const USER = 'user';

export function localStorageMealstoken(storage) {
  localStorage.setItem(USE_MEALS_TOKEN, storage);
}

export function localStorageCocktailsToken(storage) {
  localStorage.setItem(USE_COCKTIL_TOKEN, storage);
}

export function localStorageUser(storage) {
  localStorage.setItem(USER, JSON.stringify(storage));
}
