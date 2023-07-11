'use client'

import { createContext, useEffect, useState } from 'react'
import Keycloak, {
  type KeycloakConfig,
  type KeycloakInitOptions,
} from 'keycloak-js'

import { IAuth } from '@/types/auth'

import { fetchUserProfile } from './auth'

const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM!
const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_REALM_CLIENT_ID!
const url = process.env.NEXT_PUBLIC_KEYCLOAK_URL!
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
console.log({ realm, clientId, url, baseUrl })
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
  pkceMethod: 'S256',
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
  firstName: string
  token: string
  profile: IAuth | null
  permissions: string[] | null
  roles: string[] | null
  userType: string
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {},
  firstName: '',
  token: '',
  profile: null,
  permissions: null,
  roles: null,
  userType: '',
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
  const [token, setToken] = useState('')
  const [profile, setProfile] = useState<IAuth | null>(null)
  const [firstName, setFirstName] = useState('')
  const [permissions, setPermissions] = useState<string[] | null>(null)
  const [roles, setRoles] = useState<string[] | null>(null)
  const [userType, setUserType] = useState('')

  const logout = () => {
    void keycloak.logout()
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

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
        const token = keycloak.token
        const refreshToken = keycloak.refreshToken

        if (token && refreshToken) {
          setToken(token)
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
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
        const profile = await fetchUserProfile()

        if (profile) {
          const normalizedRoles = profile.roles.map((p) => p?.toLowerCase())
          setProfile(profile)
          setFirstName(profile['first_name'])
          setPermissions(profile.permissions)
          setRoles(['home', ...normalizedRoles])
          setUserType(profile.type)
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
      value={{
        isAuthenticated,
        logout,
        firstName,
        token,
        profile,
        permissions,
        roles,
        userType,
      }}
    >
      {isAuthenticated ? props.children : null}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
