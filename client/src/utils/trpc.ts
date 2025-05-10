import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../../server/src/router";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// ...
		},
	},
});

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: import.meta.env.DEV ? "http://localhost:5000/trpc" : "/trpc",
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
