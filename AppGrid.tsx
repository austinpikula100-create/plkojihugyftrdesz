import { Link } from "wouter";
import { useApps, iconMap } from "@/hooks/use-apps";
import { motion } from "framer-motion";

export function AppGrid() {
  const { data: apps, isLoading } = useApps();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-8 w-full max-w-4xl mx-auto mt-12 px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
            <div className="w-14 h-14 rounded-2xl bg-muted"></div>
            <div className="w-16 h-4 rounded bg-muted"></div>
          </div>
        ))}
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 w-full max-w-4xl mx-auto mt-12 px-4"
    >
      {apps?.map((app) => {
        const Icon = iconMap[app.icon as keyof typeof iconMap] || iconMap.Settings;
        
        const colors: Record<string, string> = {
          "Rivo AI": "text-blue-500 bg-blue-50 group-hover:bg-blue-100 border-blue-100",
          "Rivo Search": "text-red-500 bg-red-50 group-hover:bg-red-100 border-red-100",
          "Rivo Docs": "text-yellow-600 bg-yellow-50 group-hover:bg-yellow-100 border-yellow-100",
          "Rivo Drive": "text-green-600 bg-green-50 group-hover:bg-green-100 border-green-100",
          "Rivo Sites": "text-purple-500 bg-purple-50 group-hover:bg-purple-100 border-purple-100",
          "Settings": "text-slate-500 bg-slate-50 group-hover:bg-slate-100 border-slate-100",
        };

        const colorClasses = colors[app.name] || "text-primary bg-primary/5 group-hover:bg-primary/10 border-primary/20";
        
        return (
          <motion.div key={app.id} variants={item}>
            <Link 
              href={app.path} 
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 shadow-sm group-hover:shadow-md border ${colorClasses}`}>
                <Icon strokeWidth={1.5} className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {app.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
