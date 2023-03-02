import { createBrowserRouter } from "react-router-dom"
import LayoutPublic from "../Layout/LayoutPublic"

import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Perfil from "../Pages/Perfil"

export const router = createBrowserRouter([
  {
    path:'/',
    element:<LayoutPublic/>,
    children:[
      {
        index:true,
        element:<Home/>
        
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/perfil',
        element:<Perfil/>
      }
    ]
  }
])