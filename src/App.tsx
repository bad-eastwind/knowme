import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Home ships in the main bundle; every other page loads on demand.
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Experience = lazy(() => import('./pages/Experience'))
const Research = lazy(() => import('./pages/Research'))
const Stack = lazy(() => import('./pages/Stack'))
const Photography = lazy(() => import('./pages/Photography'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const s = (el: React.ReactNode) => <Suspense fallback={null}>{el}</Suspense>

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: s(<Projects />) },
      { path: '/projects/:slug', element: s(<ProjectDetail />) },
      { path: '/experience', element: s(<Experience />) },
      { path: '/research', element: s(<Research />) },
      { path: '/stack', element: s(<Stack />) },
      { path: '/photography', element: s(<Photography />) },
      { path: '/contact', element: s(<Contact />) },
      { path: '*', element: s(<NotFound />) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
