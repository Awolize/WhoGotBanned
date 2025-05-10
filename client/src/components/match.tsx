import { Summoner } from "@/components/summoner";
import type { RouterOutput } from "@/utils/trpc";

type Match = RouterOutput["riot"]["matches"][0];

export function Match({
	match,
	user1,
	user2,
}: { match: Match; user1: string; user2: string }) {
	const groups = match.info.participants.reduce<
		Record<number, Match["info"]["participants"]>
	>((acc, p) => {
		const groupId = p.playerSubteamId ?? p.teamId;
		if (!acc[groupId]) acc[groupId] = [];
		acc[groupId].push(p);
		return acc;
	}, {});

	// Sort groups by the placement of the top player in each team (highest placement first)
	const sortedGroups = Object.entries(groups).sort(
		([groupIdA, playersA], [groupIdB, playersB]) =>
			playersA[0].subteamPlacement - playersB[0].subteamPlacement,
	);

	return (
		<li key={match.metadata.matchId} className="space-y-8">
			<div className="grid grid-cols-2 gap-2">
				{sortedGroups.map(([groupId, players]) => (
					<ul key={groupId} className="flex flex-col gap-1">
						Placement: {players[0].subteamPlacement}
						{players.map((summoner) => {
							const tag = `${summoner.riotIdGameName}#${summoner.riotIdTagline}`;
							const isUser = tag === user1;
							const isBanned = tag === user2;

							return (
								<div
									key={summoner.puuid}
									className={`${isUser ? "border-2 border-yellow-400 rounded" : isBanned ? "border-2 border-red-500 rounded" : ""}`}
								>
									<Summoner match={match} user={tag} />
								</div>
							);
						})}
					</ul>
				))}
			</div>
		</li>
	);
}
