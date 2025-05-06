import { Summoner } from "@/components/summoner";
import type { RouterOutput } from "@/utils/trpc";

type Match = RouterOutput["riot"]["matches"][0];

export function Match({
	match,
	user1,
	user2,
}: { match: Match; user1: string; user2: string }) {
	return (
		<li key={match.metadata.matchId}>
			<ul className="flex flex-row gap-4">
				<div className="grow">
					<Summoner match={match} user={user1} />
				</div>
				<div className="grow">
					<Summoner match={match} user={user2} />
				</div>
			</ul>
		</li>
	);
}
