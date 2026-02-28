import { QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Users from "./components/Users";
import queryClient from "./lib/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Users />
    </QueryClientProvider>
  );
}

export default App;
