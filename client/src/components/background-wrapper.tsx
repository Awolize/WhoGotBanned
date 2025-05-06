import { useTheme } from "@/components/theme-provider";

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();

	const getBg = () => {
		if (theme === "dark") return "url('/ashen-graveknight-mordekaiser.webp')";
		if (theme === "light") return "url('/mordekaiser-sahn-uzal.webp')";
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		return prefersDark
			? "url('/ashen-graveknight-mordekaiser.webp')"
			: "url('/mordekaiser-sahn-uzal.webp')";
	};

	return (
		<div
			className="min-h-screen bg-cover bg-center transition-all duration-500"
			style={{ backgroundImage: getBg() }}
		>
			{children}
		</div>
	);
}
