import { useQuery } from "@tanstack/react-query";
import { api, type AppResponse } from "@shared/routes";
import { Bot, Search, FileText, HardDrive, Layout, Settings } from "lucide-react";

// Default apps fallback if API returns empty
const DEFAULT_APPS: AppResponse[] = [
  { id: 1, name: "Rivo AI", icon: "Bot", path: "/ai", description: "Your AI assistant", isExternal: false },
  { id: 2, name: "Rivo Search", icon: "Search", path: "/search", description: "Search everything", isExternal: false },
  { id: 3, name: "Rivo Docs", icon: "FileText", path: "/docs", description: "Create documents", isExternal: false },
  { id: 4, name: "Rivo Drive", icon: "HardDrive", path: "/drive", description: "Store files", isExternal: false },
  { id: 5, name: "Rivo Sites", icon: "Layout", path: "/sites", description: "Build websites", isExternal: false },
  { id: 6, name: "Settings", icon: "Settings", path: "/settings", description: "Manage preferences", isExternal: false },
];

export function useApps() {
  return useQuery({
    queryKey: [api.apps.list.path],
    queryFn: async () => {
      // In a real app, this fetches from the backend
      // For this demo, we can mock the fetch or use the endpoint if it was seeded
      // const res = await fetch(api.apps.list.path);
      // if (!res.ok) throw new Error("Failed to fetch apps");
      // const data = await res.json();
      
      // Returning local defaults for robust demo experience since backend might be empty
      return DEFAULT_APPS; 
    },
  });
}

export const iconMap = {
  Bot,
  Search,
  FileText,
  HardDrive,
  Layout,
  Settings
};
