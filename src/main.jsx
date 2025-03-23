import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Shop } from './Pages/Shop.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/storre';

const images = import.meta.glob('/src/assets/images/*', { eager: true });

const router = createBrowserRouter([
  {path: '/', element: <App images={images} />},
  {path: 'shop/:type/:id', element: <Shop images={images} />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
