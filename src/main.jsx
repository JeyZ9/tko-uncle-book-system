import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Shop } from './Pages/Shop.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/storre';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: 'shop/:type/:id', element: <Shop />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
