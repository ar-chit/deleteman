import { ThemeProvider } from "@/components/theme-provider";
import Root from "./pages/Root";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Root />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
