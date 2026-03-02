import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/disciplines/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/disciplines/"!</div>
}
