import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LandingPage() {
	const greeting = useQuery(trpc.greeting.queryOptions({ name: "tRPC user" }));
	const [inputValue1, setInputValue1] = useState("");
	const [inputValue2, setInputValue2] = useState("");

	const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue1(e.target.value);
	const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue2(e.target.value);

	return (
		<div className="relative h-screen flex justify-center items-center">
			<div className="absolute top-4 right-4">
				<ModeToggle />
			</div>

			<div className="flex flex-col gap-4 w-96">
				<Input
					value={inputValue1}
					onChange={handleChange1}
					placeholder="First Input"
				/>
				<Input
					value={inputValue2}
					onChange={handleChange2}
					placeholder="Second Input"
				/>
				<Button
					onClick={() =>
						alert(`Input 1: ${inputValue1}, Input 2: ${inputValue2}`)
					}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
