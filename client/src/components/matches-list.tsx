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

	const getUserTag = (user: string | undefined) => {
		const match = matches[0];
		return `${
			match.info.participants.find(
				(e) =>
					`${e.riotIdGameName!.toLowerCase()}#${e.riotIdTagline.toLowerCase()}` ===
					user?.toLowerCase(),
			)?.riotIdGameName
		}#${
			match.info.participants.find(
				(e) =>
					`${e.riotIdGameName!.toLowerCase()}#${e.riotIdTagline.toLowerCase()}` ===
					user?.toLowerCase(),
			)?.riotIdTagline
		}`;
	};

	return (
		<div className="h-full overflow-y-auto gap-2 flex flex-col">
			<ul className="text-sm space-y-4">
				{matches.map((match) => (
					<>
						{new Date(match.info.gameEndTimestamp).toLocaleDateString()}{" "}
						{new Date(match.info.gameEndTimestamp).toLocaleTimeString()}
						<Match
							key={match.metadata.matchId}
							match={match}
							user1={getUserTag(user1)}
							user2={getUserTag(user2)}
						/>
					</>
				))}
			</ul>
		</div>
	);
}
