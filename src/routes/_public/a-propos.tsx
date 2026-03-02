import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/a-propos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/a-propos"!</div>
}
