import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import JoinGame from "@/pages/JoinGame";
import OrganizeGame from "@/pages/OrganizeGame";
import PlayerDatabase from "@/pages/PlayerDatabase";
import ForOrganizers from "@/pages/ForOrganizers";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/join-a-game" component={JoinGame} />
      <Route path="/organize-a-game" component={OrganizeGame} />
      <Route path="/player-database" component={PlayerDatabase} />
      <Route path="/for-organizers" component={ForOrganizers} />
      {/* Fallback to 404 */}
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
