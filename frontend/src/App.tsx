import Container from "./components/container/Container.tsx";
import Chat from "./pages/chat/Chat.tsx";
import Home from "./pages/home/Home.tsx";
import usePageStore from "./store/page.store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const page = usePageStore((state) => state.currentPage);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        {page === "home" && <Home />}
        {page === "chat" && <Chat />}
      </Container>
    </QueryClientProvider>
  );
}

export default App;
