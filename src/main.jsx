import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CharacterDetail from './routes/CharacterDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    // errorElement: 
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "characters/:ocid",
        element: <CharacterDetail />
      }
    ]
  },
]);

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  // </React.StrictMode>,
)
