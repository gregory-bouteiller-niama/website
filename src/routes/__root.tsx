import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "níama" }],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

// DOCUMENT --------------------------------------------------------------------------------------------------------------------------------
function RootDocument({ children }: RootDocumentProps) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
type RootDocumentProps = React.PropsWithChildren;
