import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Placeholder from "@/pages/Placeholder";
import SignIn from "@/pages/SignIn";
import { Bot, Search, FileText, HardDrive, Layout, Settings as SettingsIcon } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      
      {/* Placeholder Routes for Demo */}
      <Route path="/ai">
        <Placeholder 
          title="Rivo AI" 
          description="Your intelligent assistant for everything."
          icon={<Bot className="w-12 h-12 text-blue-600" />}
          colorClass="bg-blue-50"
        />
      </Route>
      <Route path="/search">
        <Placeholder 
          title="Rivo Search" 
          description="Find exactly what you're looking for."
          icon={<Search className="w-12 h-12 text-red-600" />}
          colorClass="bg-red-50"
          isSearch
        />
      </Route>
      <Route path="/docs">
        <Placeholder 
          title="Rivo Docs" 
          description="Create, edit, and share documents effortlessly."
          icon={<FileText className="w-12 h-12 text-yellow-600" />}
          colorClass="bg-yellow-50"
        />
      </Route>
      <Route path="/drive">
        <Placeholder 
          title="Rivo Drive" 
          description="Secure cloud storage for all your files."
          icon={<HardDrive className="w-12 h-12 text-green-600" />}
          colorClass="bg-green-50"
        />
      </Route>
      <Route path="/sites">
        <Placeholder 
          title="Rivo Sites" 
          description="Build beautiful websites in minutes."
          icon={<Layout className="w-12 h-12 text-blue-600" />}
          colorClass="bg-blue-50"
        />
      </Route>
      <Route path="/settings">
        <Placeholder 
          title="Settings" 
          description="Manage your preferences and account."
          icon={<SettingsIcon className="w-12 h-12 text-slate-600" />}
          colorClass="bg-slate-50"
        />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
