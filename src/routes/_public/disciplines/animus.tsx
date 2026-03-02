import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/disciplines/animus')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/animus"!</div>
}
