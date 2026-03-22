import { createFileRoute } from "@tanstack/react-router"
import { userQueryOptions } from "@/lib/functions"
import { useSuspenseQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/user/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(params.id))
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: user } = useSuspenseQuery(userQueryOptions(id))

  return <div>Привет {user.name}</div>
}
