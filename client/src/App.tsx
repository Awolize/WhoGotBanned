import { QueryClientProvider } from "@tanstack/react-query";
import { Greeting } from "./Greeting";
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
