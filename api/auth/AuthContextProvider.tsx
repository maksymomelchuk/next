'use client'

import { createContext, useEffect, useState } from 'react'
import Keycloak, {
  type KeycloakConfig,
  type KeycloakInitOptions,
} from 'keycloak-js'

const realm = process.env.NEXT_PUBLIC_REALM!
const clientId = process.env.NEXT_PUBLIC_REALM_CLIENT_ID!
const url = process.env.NEXT_PUBLIC_KEYCLOAK_URL!
/**
 * KeycloakConfig configures the connection to the Keycloak server.
 */
const keycloakConfig: KeycloakConfig = {
  realm,
  clientId,
  url,
}

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: 'login-required',
}

// Create the Keycloak client instance
export let keycloak: Keycloak.KeycloakInstance
if (typeof window !== 'undefined') {
  keycloak = new Keycloak(keycloakConfig)
} else {
  keycloak = {} as Keycloak.KeycloakInstance
  console.log('window is undefined')
}

/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
interface AuthContextValues {
  /**
   * Whether a user is currently authenticated
   */
  isAuthenticated: boolean
  logout: () => void
  username: string
  hasRole: (role: string) => boolean
  token: string
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {},
  username: '',
  hasRole: (role) => false,
  token: '',
}

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
)

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  children: JSX.Element
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {
  console.log('rendering AuthContextProvider')

  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [token, setToken] = useState('')

  const logout = () => {
    void keycloak.logout()
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  const hasRole = (role: string) => keycloak.hasRealmRole(role)

  useEffect(() => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      console.log('initialize Keycloak')
      try {
        const isAuthenticatedResponse = await keycloak.init(keycloakInitOptions)
        console.log('isAuthenticatedResponse:', isAuthenticatedResponse)

        if (!isAuthenticatedResponse) {
          console.log(
            'user is not yet authenticated. forwarding user to login.'
          )
          void keycloak.login()
        }
        console.log('user already authenticated')
        setAuthenticated(isAuthenticatedResponse)
      } catch {
        console.log('error initializing Keycloak')
        setAuthenticated(false)
      }
    }

    void initializeKeycloak()
      .then(() => console.log('initialized Keycloak'))
      .catch(() => console.log('error initializing Keycloak'))
  }, [])

  useEffect(() => {
    /**
     * Load the profile for of the user from Keycloak
     */
    async function loadProfile() {
      try {
        const token = keycloak.token
        const refreshToken = keycloak.refreshToken

        if (token && refreshToken) {
          setToken(token)
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
        }

        const profile = await keycloak.loadUserProfile()

        if (profile.firstName) {
          setUsername(profile.firstName)
        } else if (profile.username) {
          setUsername(profile.username)
        }
      } catch {
        console.log('error trying to load the user profile')
      }
    }

    // Only load the profile if a user is authenticated
    if (isAuthenticated) {
      void loadProfile()
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, username, hasRole, token }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
