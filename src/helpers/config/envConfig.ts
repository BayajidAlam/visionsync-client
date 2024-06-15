export const getBaseUrl = ():string => {

  return process.env.VITE_API_URL || "http://localhost:5000/api/v1"
}