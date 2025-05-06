import type { RouterOutput } from "@/utils/trpc";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Match = RouterOutput["riot"]["matches"][0];

export function Summoner({ match, user }: { match: Match; user: string }) {
	const player = match.info.participants.find((e) =>
		user.toLowerCase().includes(e.riotIdGameName?.toLowerCase() ?? ""),
	);

	const { data: version } = useQuery({
		...trpc.getVersion.queryOptions(),
		enabled: !!player,
	});

	if (!player || !version) return null;

	// Build the URL for the champion image
	const championUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`;

	// Generate item URLs dynamically
	const itemUrls = [
		player.item0,
		player.item1,
		player.item2,
		player.item3,
		player.item4,
		player.item5,
		player.item6,
	].map((itemId) =>
		itemId
			? `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`
			: null,
	);

	const teamColors = {
		1: "blue",
		2: "red",
	};

	const teamKey = Math.floor(player.teamId / 100);

	return (
		<li className="flex flex-row justify-start items-center gap-4">
			<div
				style={{
					minHeight: 30,
					minWidth: 5,
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
				}}
			>
				<div
					className="rounded-xl h-2 w-2"
					style={{
						backgroundColor:
							teamKey === 1
								? teamColors[1]
								: teamKey === 2
									? teamColors[2]
									: "gray",
					}}
				/>
			</div>

			{/* Champion Image */}
			<img
				src={championUrl}
				className="rounded"
				alt={player.championName}
				height={40}
				width={40}
			/>

			{/* Player Stats */}
			<div className="w-12">
				{player.kills}/{player.deaths}/{player.assists}
			</div>

			{/* Display items dynamically */}
			<div className="flex gap-1">
				{itemUrls.map((itemUrl, idx) =>
					itemUrl ? (
						<img
							key={idx}
							src={itemUrl}
							className="rounded"
							alt={`Item ${idx}`}
							height={30}
							width={30}
						/>
					) : (
						<div
							key={idx}
							style={{
								minHeight: 30,
								minWidth: 30,
								backgroundColor: "transparent", // Transparent background
								border: "1px solid #444", // Border for better visibility
							}}
						/>
					),
				)}
			</div>
		</li>
	);
}
