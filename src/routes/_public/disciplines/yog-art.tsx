import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/disciplines/yog-art')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/yog-art"!</div>
}
