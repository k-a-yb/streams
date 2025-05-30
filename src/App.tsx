import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Collection from "./pages/Collection";
import Search from "./pages/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WalletProvider } from "./contexts/WalletContext";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-cinema-gradient">
    <Header />
    <main className="flex-1 pt-20">
      {children}
    </main>
    <Footer />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WalletProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<Layout><Dashboard /></Layout>} path="/dashboard" />
            <Route element={<Layout><Movies /></Layout>} path="/movies" />
            <Route element={<Layout><TVShows /></Layout>} path="/tvshows" />
            <Route element={<Layout><Collection /></Layout>} path="/collection" />
            <Route element={<Layout><Search /></Layout>} path="/search" />
            <Route element={<Layout><NotFound /></Layout>} path="*" />
          </Routes>
        </WalletProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
