import { n as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-CNmA0ie9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
throw new Error("SeasonCaddy Supabase environment variables are missing.");
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		async function loadSession() {
			try {
				const { data, error } = await supabase.auth.getSession();
				if (error) console.error("Failed to load Supabase session:", error);
				if (mounted) {
					setUser(data.session?.user ?? null);
					setLoading(false);
				}
			} catch (error) {
				console.error("Failed to load Supabase session:", error);
				if (mounted) {
					setUser(null);
					setLoading(false);
				}
			}
		}
		loadSession();
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!mounted) return;
			setUser(session?.user ?? null);
			setLoading(false);
		});
		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Failed to sign out:", error);
			throw error;
		}
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		loading,
		signOut
	}), [
		user,
		loading,
		signOut
	]);
	return (0, import_react.createElement)(AuthContext.Provider, { value }, children);
}
function useAuth() {
	const auth = (0, import_react.useContext)(AuthContext);
	if (!auth) throw new Error("useAuth must be used within AuthProvider");
	return auth;
}
//#endregion
export { supabase as n, useAuth as r, AuthProvider as t };
var supabase, AuthContext;
