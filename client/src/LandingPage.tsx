import { useState, useCallback } from "react";
import { trpc } from "./utils/trpc";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { MatchesList } from "@/components/matches-list";
import { useTheme } from "@/components/theme-provider";

export function LandingPage() {
	const [user1, setUser1] = useState("");
	const [user2, setUser2] = useState("");
	const [open, setOpen] = useState(false);

	const commonMatchesQuery = useQuery({
		...trpc.riot.queryOptions({
			user1,
			user2,
		}),
		enabled: false,
	});

	const onSearch = useCallback(async () => {
		const res = await commonMatchesQuery.refetch();
		if (!res.error) setOpen(true);
	}, [commonMatchesQuery]);

	return (
		<div className="relative h-screen flex justify-center items-center">
			<div className="absolute top-4 right-4">
				<ModeToggle />
			</div>

			<div className="relative flex flex-col gap-4 w-72 px-8 py-6 scale-120 bg-background/40 backdrop-blur-xs border rounded">
				<h1 className="text-center text-[1.8rem] uppercase font-bold ">
					Who got <span className="text-red-800">banned</span>?
				</h1>
				<Input
					value={user1}
					onChange={(e) => setUser1(e.target.value)}
					placeholder="Your name#tag"
				/>
				<Input
					value={user2}
					onChange={(e) => setUser2(e.target.value)}
					placeholder="Banned name#tag"
				/>
				<Button onClick={onSearch} disabled={commonMatchesQuery.isLoading}>
					{commonMatchesQuery.isLoading ? "Searching..." : "Search"}
				</Button>
				{commonMatchesQuery.error && (
					<div className="text-red-500 text-sm">
						{commonMatchesQuery.error.message}
					</div>
				)}
			</div>

			<div className="absolute flex justify-center items-center">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="max-h-[80vh] overflow-hidden">
						<DialogHeader>
							<DialogTitle>
								Common Matches{" "}
								{commonMatchesQuery.data?.matches.length
									? `(${commonMatchesQuery.data?.matches.length === 5 ? `${commonMatchesQuery.data?.matches.length}+` : commonMatchesQuery.data?.matches.length})`
									: ""}
							</DialogTitle>
						</DialogHeader>

						<MatchesList
							matches={commonMatchesQuery.data?.matches}
							user1={user1}
							user2={user2}
						/>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
