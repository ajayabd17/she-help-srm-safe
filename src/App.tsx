
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import MyComplaints from "./pages/MyComplaints";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import CampusMap from "./pages/CampusMap";
import AdminComplaints from "./pages/AdminComplaints";
import AdminAnonymousComplaints from "./pages/AdminAnonymousComplaints";
import AdminAlerts from "./pages/AdminAlerts";
import SafetyStatus from "./pages/SafetyStatus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/anonymous-complaints" element={<AdminAnonymousComplaints />} />
          <Route path="/admin/alerts" element={<AdminAlerts />} />
          <Route path="/admin/safety-status" element={<SafetyStatus />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
