import { _ as lazyRouteComponent, q as notFound, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as fetchDatasetForGame, p as gameDisplayTitle, y as isEventTitleOnlyGame } from "./frontend-data-DJPCkXA4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game._gameId-BuiUV0zv.js
var $$splitComponentImporter = () => import("./game._gameId-C9r7HBOb.mjs");
var $$splitNotFoundComponentImporter = () => import("./game._gameId-Bcs2bBPP.mjs");
var $$splitErrorComponentImporter = () => import("./game._gameId-C1qaogRO.mjs");
var Route = createFileRoute("/game/$gameId")({
	validateSearch: (search) => ({ region: typeof search.region === "string" ? search.region : void 0 }),
	loader: async ({ params }) => {
		const dataset = await fetchDatasetForGame(params.gameId).catch((error) => {
			console.error("Could not load fixture data", error);
			return null;
		});
		const liveGame = dataset?.games[0];
		if (liveGame) return {
			game: liveGame,
			broadcasts: dataset?.broadcasts ?? []
		};
		throw notFound();
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Game unavailable — SeasonCaddy" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { game } = loaderData;
		const eventTitleOnly = isEventTitleOnlyGame(game);
		const title = `${gameDisplayTitle(game)} — SeasonCaddy`;
		const description = `${game.league} ${eventTitleOnly ? "event" : "fixture"} and regional viewing options.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
