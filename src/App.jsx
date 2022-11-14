import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      // {
      //   path: '/blog',
      //   element: <BlogLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <DeferredBlogPostsPage />,
      //       loader: deferredBlogPostsLoader,
      //     },
      //     {
      //       path: ':id',
      //       element: <PostDetailPage />,
      //       loader: blogPostLoader,
      //     },
      //   ],
      // },
      // {
      //   path: '/blog/new',
      //   element: <NewPostPage />,
      //   action: newPostAction,
      // },
    ],
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
