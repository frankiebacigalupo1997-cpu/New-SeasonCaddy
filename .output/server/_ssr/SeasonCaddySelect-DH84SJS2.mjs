import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { D as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SeasonCaddySelect-DH84SJS2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPEAHEAD_RESET_MS = 5e3;
function SeasonCaddySelect({ value, options, placeholder = "Select", disabled = false, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [typeaheadQuery, setTypeaheadQuery] = (0, import_react.useState)("");
	const rootRef = (0, import_react.useRef)(null);
	const typeaheadResetRef = (0, import_react.useRef)(null);
	const selected = options.find((option) => option.value === value);
	const filteredOptions = (0, import_react.useMemo)(() => {
		const normalizedQuery = typeaheadQuery.trim().toLocaleLowerCase();
		if (!normalizedQuery) return options;
		return options.filter((option) => option.label.toLocaleLowerCase().includes(normalizedQuery));
	}, [options, typeaheadQuery]);
	function clearTypeahead() {
		if (typeaheadResetRef.current) {
			clearTimeout(typeaheadResetRef.current);
			typeaheadResetRef.current = null;
		}
		setTypeaheadQuery("");
	}
	function scheduleTypeaheadReset() {
		if (typeaheadResetRef.current) clearTimeout(typeaheadResetRef.current);
		typeaheadResetRef.current = setTimeout(() => {
			setTypeaheadQuery("");
			typeaheadResetRef.current = null;
		}, TYPEAHEAD_RESET_MS);
	}
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (rootRef.current && !rootRef.current.contains(event.target)) {
				setOpen(false);
				clearTypeahead();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			if (typeaheadResetRef.current) clearTimeout(typeaheadResetRef.current);
		};
	}, []);
	function handleTypeaheadKeyDown(event) {
		if (disabled || event.ctrlKey || event.metaKey || event.altKey) return;
		if (event.key === "Escape") {
			if (typeaheadQuery) {
				event.preventDefault();
				event.stopPropagation();
				clearTypeahead();
				return;
			}
			setOpen(false);
			return;
		}
		if (event.key === "Backspace") {
			if (!typeaheadQuery) return;
			event.preventDefault();
			event.stopPropagation();
			setTypeaheadQuery((current) => current.slice(0, -1));
			setOpen(true);
			scheduleTypeaheadReset();
			return;
		}
		if (event.key.length !== 1 || event.key === "\n" || event.key === "\r") return;
		event.preventDefault();
		event.stopPropagation();
		setTypeaheadQuery((current) => `${current}${event.key}`);
		setOpen(true);
		scheduleTypeaheadReset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		onKeyDown: handleTypeaheadKeyDown,
		className: "seasoncaddy-select",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			disabled,
			onClick: () => setOpen((current) => {
				const next = !current;
				if (!next) clearTypeahead();
				return next;
			}),
			className: `seasoncaddy-select-trigger ${open ? "seasoncaddy-select-trigger-open" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected?.label ?? placeholder }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-4 transition-transform ${open ? "rotate-180" : ""}` })]
		}), open && !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "seasoncaddy-select-menu",
			children: [filteredOptions.map((option) => {
				const active = option.value === value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						onChange(option.value);
						setOpen(false);
						clearTypeahead();
					},
					className: `seasoncaddy-select-option ${active ? "seasoncaddy-select-option-active" : ""}`,
					children: option.label
				}, option.value);
			}), filteredOptions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "seasoncaddy-select-empty",
				children: "No matches"
			})]
		})]
	});
}
//#endregion
export { SeasonCaddySelect as t };
