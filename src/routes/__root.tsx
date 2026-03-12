import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import type { ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/adapted/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import appCssUrl from "../app.css?url";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createRootRouteWithContext<RootContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "níama | l'équilibre invisible devenu tangible" },
      {
        name: "description",
        content:
          "Une constellation d'accompagnants rassemblés autour d'une philosophie commune : vous guider sur le chemin de votre alignement intérieur.",
      },
      { name: "keywords", content: "accompagnants, équilibre, alignement" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCssUrl },
      { rel: "icon", href: "/logo.svg" },
    ],
  }),
  shellComponent: RootDocument,
});

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const ROOT = {
  base: cva("flex min-h-screen flex-col overflow-x-hidden antialiased"),
};

// DOCUMENT --------------------------------------------------------------------------------------------------------------------------------
function RootDocument({ children }: RootDocumentProps) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className={ROOT.base()}>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-center" richColors />
          </TooltipProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
type RootDocumentProps = React.PropsWithChildren;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type RootContext = {
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
  queryClient: QueryClient;
};
