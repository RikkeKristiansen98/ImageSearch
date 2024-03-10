import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-5y3ytlhddmxjro5c.eu.auth0.com"
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={Router} />
  </Auth0Provider>,
  </React.StrictMode>,
)
