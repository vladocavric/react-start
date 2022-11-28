import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

import DNDBasicPage from './pages/DND/DNDBasicPage';
import DNDTwoColumnPage from './pages/DND/DNDTwoColumnPage';
import DNDKanbanPage from './pages/DND/DNDKanbanPage';

import UIPage from './pages/UI/UIPage';
import ButtonsPage from './pages/UI/ButtonsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/dnd',
        // element: ,
        children: [
          {
            index: true,
            element: <DNDBasicPage />
            // loader: deferredBlogPostsLoader,
          },
          {
            path: 'basic',
            element: <DNDBasicPage />,
            // loader: blogPostLoader,
          },
          {
            path: '2-column',
            element: <DNDTwoColumnPage />,
            // loader: blogPostLoader,
          },
          {
            path: 'kanban',
            element: <DNDKanbanPage />,
            // loader: blogPostLoader,
          },
        ],
      },
      {
        path: 'ui',
        
        children: [
          {
            index: true,
            element: <UIPage />,
          },
          {
            path: 'buttons',
            element: <ButtonsPage />
          }
        ]
      },
    ],
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
