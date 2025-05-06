import type { RouterOutput } from "@/utils/trpc";
import React from "react";

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
		<div className="h-full overflow-y-auto">
			<ul className="text-sm space-y-1">
				{matches.map((match) => (
					<li key={match.metadata.matchId} className="break-all">
						<ul className="flex flex-row gap-2">
							<li>
								{
									match.info.participants.find((e) =>
										user1
											.toLowerCase()
											.includes(e.riotIdGameName?.toLowerCase() ?? ""),
									)?.championName
								}
							</li>
							<li>
								{
									match.info.participants.find((e) =>
										user2
											.toLowerCase()
											.includes(e.riotIdGameName?.toLowerCase() ?? ""),
									)?.championName
								}
							</li>
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}
