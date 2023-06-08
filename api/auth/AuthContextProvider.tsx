"use client"

import { createContext, useEffect, useState } from "react"
import Keycloak, {
  type KeycloakConfig,
  type KeycloakInitOptions,
} from "keycloak-js"

/**
 * KeycloakConfig configures the connection to the Keycloak server.
 */
const keycloakConfig: KeycloakConfig = {
  realm: "myrealm",
  clientId: "myclient",
  url: "http://localhost:8080",
}

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: "login-required",
}

// Create the Keycloak client instance
let keycloak: Keycloak.KeycloakInstance
if (typeof window !== "undefined") {
  keycloak = new Keycloak(keycloakConfig)
} else {
  keycloak = {} as Keycloak.KeycloakInstance
  console.log("window is undefined")
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
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {},
  username: "",
  hasRole: (role) => false,
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
  console.log("rendering AuthContextProvider")

  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")

  const logout = () => {
    void keycloak.logout()
  }

  const hasRole = (role: string) => keycloak.hasRealmRole(role)

  useEffect(() => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      console.log("initialize Keycloak")
      try {
        const isAuthenticatedResponse = await keycloak.init(keycloakInitOptions)

        if (!isAuthenticatedResponse) {
          console.log(
            "user is not yet authenticated. forwarding user to login."
          )
          void keycloak.login()
        }
        console.log("user already authenticated")
        setAuthenticated(isAuthenticatedResponse)
      } catch {
        console.log("error initializing Keycloak")
        setAuthenticated(false)
      }
    }

    void initializeKeycloak()
      .then(() => console.log("initialized Keycloak"))
      .catch(() => console.log("error initializing Keycloak"))
  }, [])

  useEffect(() => {
    /**
     * Load the profile for of the user from Keycloak
     */
    async function loadProfile() {
      try {
        const profile = await keycloak.loadUserProfile()

        if (profile.firstName) {
          setUsername(profile.firstName)
        } else if (profile.username) {
          setUsername(profile.username)
        }
      } catch {
        console.log("error trying to load the user profile")
      }
    }

    // Only load the profile if a user is authenticated
    if (isAuthenticated) {
      void loadProfile()
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, username, hasRole }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
