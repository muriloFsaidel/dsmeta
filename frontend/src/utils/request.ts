// the constant BASE_URL receives the value of env variable VITE_BACKEND_URL if it's not filled??,
// BASE_URL by default receives "http://localhost:8080"
export const BASE_URL = import.meta.env.VITE_BACKEND_URL ??  "http://localhost:8080";