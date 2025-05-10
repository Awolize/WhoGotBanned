import type { RouterOutput } from "@/utils/trpc";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Match = RouterOutput["riot"]["matches"][0];

export function Summoner({
	match,
	user,
	isUser,
	isBanned,
}: {
	match: Match;
	user: string;
	isUser: boolean;
	isBanned: boolean;
}) {
	const [userGameName, userTagLine] = user.split("#");
	const player = match.info.participants.find(
		(p) =>
			p.riotIdGameName?.toLowerCase() === userGameName?.toLowerCase() &&
			p.riotIdTagline?.toLowerCase() === userTagLine?.toLowerCase(),
	);

	const { data: version } = useQuery({
		...trpc.getVersion.queryOptions(),
		enabled: !!player,
	});

	if (!player || !version) return null;

	const championUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`;

	const itemIds = [
		player.item0,
		player.item1,
		player.item2,
		player.item3,
		player.item4,
		player.item5,
		player.item6,
	];

	const borderClass = isUser
		? "border-1 border-yellow-400"
		: isBanned
			? "border-1 border-red-500"
			: "";

	return (
		<li className="min-w-0">
			<div
				className={`flex items-center gap-4 rounded p-2 ${borderClass} min-w-max`} // Added min-w-max
			>
				{/* Fixed width elements */}
				<img
					src={championUrl}
					className="h-8 w-8 rounded flex-shrink-0"
					alt={player.championName}
				/>

				<div className="w-24 truncate flex-shrink-0">
					{player.riotIdGameName}
					{player.riotIdTagline && `#${player.riotIdTagline}`}
				</div>

				<div className="w-12 font-mono flex-shrink-0">
					{player.kills}/{player.deaths}/{player.assists}
				</div>

				<div className="flex gap-1">
					{itemIds.map((itemId, idx) => (
						<div
							key={`${itemId}-${idx}`}
							className="h-8 w-8 border border-gray-600 bg-gray-800 flex-shrink-0"
						>
							{itemId > 0 && (
								<img
									src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`}
									className="h-full w-full object-cover"
									alt={`Item ${itemId}`}
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</li>
	);
}
