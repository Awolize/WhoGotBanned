import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./router.js";

const app = new Hono();

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

app.use(
	"/*",
	serveStatic({
		root: "../client/dist",
	}),
);

app.use(
	"/*",
	serveStatic({
		root: "../client/dist",
		path: "index.html",
	}),
);

serve(
	{
		fetch: app.fetch,
		port: 2022,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
