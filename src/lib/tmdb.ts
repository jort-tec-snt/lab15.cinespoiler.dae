import axios from "axios"

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const baseURL = import.meta.env.VITE_TMDB_BASE_URL

if (!accessToken) {
  throw new Error("Missing VITE_TMDB_ACCESS_TOKEN environment variable")
}

if (!baseURL) {
  throw new Error("Missing VITE_TMDB_BASE_URL environment variable")
}

export const tmdbClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
})