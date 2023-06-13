import axios from "axios"

const realm = process.env.NEXT_PUBLIC_REALM!
const client_id = process.env.NEXT_PUBLIC_REALM_CLIENT_ID!
const url = process.env.NEXT_PUBLIC_KEYCLOAK_URL!

const refresh = (refresh_token: string) => {
  const config = new URLSearchParams({
    client_id,
    grant_type: "refresh_token",
    refresh_token,
  })
  const data = axios.post(
    `${url}/realms/${realm}/protocol/openid-connect/token`,
    config.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  return data
}

export default refresh
