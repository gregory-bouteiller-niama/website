import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/disciplines/anima")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    // <Booker
    //   description="Select a time that works for you"
    //   eventTypeId="studio-session"
    //   resourceId="studio-a"
    //   title="Book a Recording Session"
    // />
    <div />
  )
}
