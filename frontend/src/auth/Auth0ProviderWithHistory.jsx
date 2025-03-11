import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
const { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_AUDIENCE } =
  import.meta.env
const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState) => {
    const targetPath = appState?.returnTo || window.location.pathname
    if (window.location.pathname !== targetPath) {
      navigate(targetPath)
    }
  }

  return (
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email'
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation='localstorage' // Ensures session persists after reload
      useRefreshTokens={true} // Enables refresh tokens for better persistence
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
