import { createFileRoute } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { IndexAttendants } from "./index/-attendants";
import { IndexContact } from "./index/-contact";
import { IndexDisciplines } from "./index/-disciplines";
import { IndexHero } from "./index/-hero";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/_public/")({
  component: IndexPage,
});

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const PAGE = {
  base: cva("container mx-auto flex flex-col items-center px-4 py-8 sm:px-8"),
};

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
function IndexPage() {
  return (
    <div className={PAGE.base()}>
      <IndexHero />
      <IndexDisciplines />
      <IndexAttendants />
      <IndexContact />
    </div>
  );
}
