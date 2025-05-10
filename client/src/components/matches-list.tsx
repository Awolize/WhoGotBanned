import { Match } from "@/components/match";
import type { RouterOutput } from "@/utils/trpc";

type Matches = RouterOutput["riot"]["matches"];

export function MatchesList({
	matches,
	user1,
	user2,
}: {
	matches?: Matches;
	user1: string;
	user2: string;
}) {
	if (!matches) {
		return <p className="text-muted-foreground text-sm">No matches found.</p>;
	}

	// Get properly cased tags from first match's participants
	const getCasedUserTag = (user: string) => {
		const [inputGameName, inputTagLine] = user.split("#");
		const participant = matches[0].info.participants.find(
			(p) =>
				p.riotIdGameName?.toLowerCase() === inputGameName?.toLowerCase() &&
				p.riotIdTagline?.toLowerCase() === inputTagLine?.toLowerCase(),
		);

		return participant
			? `${participant.riotIdGameName}#${participant.riotIdTagline}`
			: user; // Fallback to original input if not found
	};

	const userTag1 = getCasedUserTag(user1);
	const userTag2 = getCasedUserTag(user2);

	return (
		<div className="h-full overflow-y-auto space-y-4">
			{matches.map((match) => {
				const endDate = new Date(match.info.gameEndTimestamp);
				return (
					<div key={match.metadata.matchId} className="space-y-2 text-sm">
						<div className="font-medium text-muted-foreground">
							{/* {format(endDate, "PPpp")} Requires date-fns */}
							{/* Fallback without date-fns: */}
							Ended at: {endDate.toLocaleDateString()}{" "}
							{endDate.toLocaleTimeString()}
						</div>
						<Match match={match} user1={userTag1} user2={userTag2} />
					</div>
				);
			})}
		</div>
	);
}
