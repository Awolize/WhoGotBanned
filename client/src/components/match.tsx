import { Summoner } from "@/components/summoner";
import type { RouterOutput } from "@/utils/trpc";

type Match = RouterOutput["riot"]["matches"][0];

export function Match({
	match,
	user1,
	user2,
}: {
	match: Match;
	user1: string;
	user2: string;
}) {
	// Type-safe team grouping with fallback
	const groups = match.info.participants.reduce<
		Record<string, Match["info"]["participants"]>
	>((acc, participant) => {
		const teamId = (
			"playerSubteamId" in participant && participant.playerSubteamId
				? (participant as { playerSubteamId: number }).playerSubteamId
				: participant.teamId
		).toString();

		if (!acc[teamId]) acc[teamId] = [];
		acc[teamId].push(participant);
		return acc;
	}, {});

	// Sort teams by placement
	const sortedTeams = Object.entries(groups).sort(([, teamA], [, teamB]) => {
		const placementA = teamA[0]?.subteamPlacement ?? Number.POSITIVE_INFINITY;
		const placementB = teamB[0]?.subteamPlacement ?? Number.POSITIVE_INFINITY;
		return placementA - placementB;
	});

	return (
		<li className="space-y-4 p-4 bg-gray-900 rounded-lg shadow-lg">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
				{sortedTeams.map(([teamId, players]) => (
					<div
						key={teamId}
						className="border border-gray-700 rounded-lg pt-2 px-2 bg-gray-800 max-w-screen "
					>
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-gray-300">Team {teamId}</h3>
							<span className="text-sm text-gray-400">
								{players[0]?.subteamPlacement
									? `Placement: ${players[0].subteamPlacement}`
									: players[0]?.win
										? "Victory"
										: "Defeat"}
							</span>
						</div>

						<ul className="overflow-x-scroll flex flex-col pb-2 gap-1">
							{players.map((participant) => {
								const tag = `${participant.riotIdGameName}#${participant.riotIdTagline}`;
								return (
									<Summoner
										key={participant.puuid}
										match={match}
										user={tag}
										isUser={tag === user1}
										isBanned={tag === user2}
									/>
								);
							})}
						</ul>
					</div>
				))}
			</div>
		</li>
	);
}
