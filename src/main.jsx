import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import generateStore from './Redux/Store'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Index'

const store = generateStore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
