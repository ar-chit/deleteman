import { ThemeProvider } from "@/components/theme-provider";
import Root from "./pages/Root";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Root />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
