import { QueryClientProvider } from "@tanstack/react-query";
import { LandingPage } from "./LandingPage";
import { queryClient } from "./utils/trpc";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundWrapper } from "@/components/background-wrapper";

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BackgroundWrapper>
					<LandingPage />
				</BackgroundWrapper>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
