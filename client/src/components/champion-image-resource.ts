// championImageResource.ts
const imageCache = new Map<string, Promise<string>>();

export function createChampionImageResource(
	getChampionImage: (path: string) => Promise<string>,
) {
	return {
		read: (path: string) => {
			if (!imageCache.has(path)) {
				const promise = getChampionImage(path);
				imageCache.set(path, promise);
			}
			throw imageCache.get(path)!;
		},
	};
}
