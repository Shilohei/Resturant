import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useCurrencyUpdater } from "@/hooks/useCurrencyUpdater";
import Navbar from "@/components/navbar/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AiRecipeGeneratorPage } from "./pages/AiRecipeGeneratorPage";
import AIPoweredDiningPage from "./pages/AIPoweredDiningPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

// Currency updater component
const CurrencyUpdater = () => {
  useCurrencyUpdater();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyUpdater />
    <ThemeProvider defaultTheme="dark" storageKey="restaurant-ui-theme">
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-recipe-generator" element={<AiRecipeGeneratorPage />} />
              <Route path="/ai-dining" element={<AIPoweredDiningPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
