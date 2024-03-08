import {createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { MyFavorites } from './pages/MyFavorites';
import { NotFound } from './pages/NotFound';

export const Router = createBrowserRouter( 
[
    {
        path:'/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: 
        [{
            path:'/',
        element: <Home />,
        index: true,
        },
    {
        path:'/favorites',
        element: <MyFavorites />,
    }]
    }
]
)