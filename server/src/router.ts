import { initTRPC } from "@trpc/server";
import { z } from "zod";
import dotenv from "dotenv";
import { LolApi, RiotApi } from "twisted";
import { RegionGroups } from "twisted/dist/constants";

dotenv.config();

const parseRiotId = (id: string) => {
	const [name, tag] = id.split("#");
	if (!name || !tag) throw new Error(`Invalid Riot ID format: ${id}`);
	return [name, tag] as const;
};

async function findCommonMatches(
	user1: string,
	user2: string,
	group: RegionGroups,
) {
	const [name1, tag1] = parseRiotId(user1);
	const [name2, tag2] = parseRiotId(user2);

	const [a1, a2] = await Promise.all([
		riotApi.Account.getByRiotId(name1, tag1, group),
		riotApi.Account.getByRiotId(name2, tag2, group),
	]);

	const [m1, m2] = await Promise.all([
		lolApi.MatchV5.list(a1.response.puuid, group, { count: 100 }),
		lolApi.MatchV5.list(a2.response.puuid, group, { count: 100 }),
	]);

	const set1 = new Set(m1.response);
	const commonMatches = m2.response.filter((id) => set1.has(id));
	console.log(`Found common matches (${commonMatches.length})`);
	return commonMatches;
}

const riotApi = new RiotApi(process.env.RIOT_API_KEY!);
const lolApi = new LolApi(process.env.RIOT_API_KEY!);
const t = initTRPC.create();
const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
	riot: publicProcedure
		.input(
			z.object({
				user1: z.string(),
				user2: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const group = RegionGroups.EUROPE;

			const commonMatchIds = (
				await findCommonMatches(input.user1, input.user2, group)
			).slice(0, 5);

			const commonMatches = await Promise.all(
				commonMatchIds.map(
					async (id) => (await lolApi.MatchV5.get(id, group)).response,
				),
			);

			return { matches: commonMatches };
		}),
});

export type AppRouter = typeof appRouter;
