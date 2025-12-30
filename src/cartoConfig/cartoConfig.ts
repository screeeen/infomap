// TODO: env vars
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN
const connectionName = import.meta.env.VITE_CONNECTION_NAME
export const cartoConfig = { apiBaseUrl, accessToken, connectionName }
