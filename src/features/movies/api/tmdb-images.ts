const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL

export function getTmdbImageUrl(
  path: string | null,
  size: "w300" | "w500" | "w780" | "original" = "w500",
) {
  if (!path || !imageBaseUrl) {
    return null
  }

  return `${imageBaseUrl}/${size}${path}`
}