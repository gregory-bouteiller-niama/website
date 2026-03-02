import { createFileRoute } from "@tanstack/react-router";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/espace/authenticated")({
  component: AuthenticatedPage,
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function AuthenticatedPage() {
  return <p>Welcome!</p>;
}
