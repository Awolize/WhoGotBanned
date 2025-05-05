import { Button, Input } from "@shadcn/ui"; // Adjust based on your ShadCN library
import { QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes"; // Import theme provider
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { queryClient } from "./utils/trpc";

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class">
				{" "}
				{/* Wrap your app with ThemeProvider */}
				<Greeting />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export function Greeting() {
	const greeting = useQuery(trpc.greeting.queryOptions({ name: "tRPC user" }));
	const [inputValue1, setInputValue1] = useState("");
	const [inputValue2, setInputValue2] = useState("");

	const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue1(e.target.value);
	const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue2(e.target.value);

	return (
		<div className="relative h-screen flex justify-center items-center bg-black text-white">
			{/* Theme toggle in the top right corner */}
			<div className="absolute top-4 right-4">
				<button onClick={() => document.body.classList.toggle("dark")}>
					Toggle Theme
				</button>
			</div>

			<div className="flex flex-col gap-4 w-96">
				<Input
					value={inputValue1}
					onChange={handleChange1}
					placeholder="First Input"
					className="bg-gray-800 text-white"
				/>
				<Input
					value={inputValue2}
					onChange={handleChange2}
					placeholder="Second Input"
					className="bg-gray-800 text-white"
				/>
				<Button
					onClick={() =>
						alert(`Input 1: ${inputValue1}, Input 2: ${inputValue2}`)
					}
				>
					Submit
				</Button>
			</div>

			<div>{greeting.data?.text}</div>
		</div>
	);
}
