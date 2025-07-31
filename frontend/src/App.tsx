import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Container from 'components/container/Container';

import Chat from 'pages/chat/Chat';
import Home from 'pages/home/Home';

import { QueryProvider } from 'providers/QueryProvider';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  { path: '/chat', element: <Chat /> }
]);

function App() {
  return (
    <QueryProvider>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </QueryProvider>
  );
}

export default App;
