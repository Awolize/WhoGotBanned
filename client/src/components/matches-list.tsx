import { Match } from "@/components/match";
import type { RouterOutput } from "@/utils/trpc";

type Matches = RouterOutput["riot"]["matches"];

export function MatchesList({
	matches,
	user1,
	user2,
}: { matches?: Matches; user1: string; user2: string }) {
	if (!matches) {
		return <p className="text-muted-foreground text-sm">No matches found.</p>;
	}

	return (
		<div className="h-full overflow-y-auto gap-2 flex flex-col">
			<ul className="flex flex-row gap-2 text-center">
				<div className="grow">{user1}</div>
				<div className="grow">{user2}</div>
			</ul>
			<ul className="text-sm space-y-1">
				{matches.map((match) => (
					<Match
						key={match.metadata.matchId}
						match={match}
						user1={user1}
						user2={user2}
					/>
				))}
			</ul>
		</div>
	);
}
