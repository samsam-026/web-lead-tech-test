import Container from "./components/container/Container.tsx";
import Chat from "./pages/chat/Chat.tsx";
import Home from "./pages/home/Home.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    
  },
  {path: '/chat',
    element: <Chat />,}
])


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
