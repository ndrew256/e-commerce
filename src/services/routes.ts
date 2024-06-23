export enum ApiPaths {
  BASE_URL = "https://api.escuelajs.co/api/v1",

  AUTH_LOGIN = `${BASE_URL}/auth/login`,
  AUTH_REGISTRATION = `${BASE_URL}/users/`,

  CURRENT_PROFILE = `${BASE_URL}/auth/profile`,
  UPDATE_PROFILE = `${BASE_URL}/users/`,
  DELETE_PROFILE = `${BASE_URL}/users/`,

  PRODUCTS = `${BASE_URL}/products`,

  CATEGORIES = `${BASE_URL}/categories`,
}
