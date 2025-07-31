import Container from "./components/container/Container.tsx";
import Chat from "./pages/chat/Chat.tsx";
import Home from "./pages/home/Home.tsx";
import usePageStore from "./store/page.store.ts";
import { QueryProvider } from "./providers/QueryProvider.tsx";

import "./App.css";


function App() {
  const page = usePageStore((state) => state.currentPage);

  return (
    <QueryProvider>
      <Container>
        {page === "home" && <Home />}
        {page === "chat" && <Chat />}
      </Container>
    </QueryProvider>
  );
}

export default App;
