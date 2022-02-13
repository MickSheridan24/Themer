
const  baseTheme = 

{
	textMateRules: [
	{
		name: "Comment",
		scope: "comment",
		settings: {
			foreground: "#75715E"
		}
	},
	{
		name: "String",
		scope: "string",
		settings: {
			foreground: "#E6DB74"
		}
	},
	{
		name: "Number",
		scope: "constant.numeric",
		settings: {
			foreground: "#AE81FF"
		}
	},
	{
		name: "Built-in constant",
		scope: "constant.language",
		settings: {
			foreground: "#AE81FF"
		}
	},
	{
		name: "User-defined constant",
		scope: [
			"constant.character",
			"constant.other"
		],
		settings: {
			foreground: "#AE81FF"
		}
	},
	{
		name: "Variable",
		scope: "variable",
		settings: {
			fontStyle: ""
		}
	},
	{
		name: "Keyword",
		scope: "keyword",
		settings: {
			foreground: "#F92672"
		}
	},
	{
		name: "Storage",
		scope: "storage",
		settings: {
			fontStyle: "",
			foreground: "#F92672"
		}
	},
	{
		name: "Storage type",
		scope: "storage.type",
		settings: {
			fontStyle: "italic",
			foreground: "#66D9EF"
		}
	},
	{
		name: "Class name",
		scope: "entity.name.class",
		settings: {
			fontStyle: "underline",
			foreground: "#A6E22E"
		}
	},
	{
		name: "Inherited class",
		scope: "entity.other.inherited-class",
		settings: {
			fontStyle: "italic underline",
			foreground: "#A6E22E"
		}
	},
	{
		name: "Function name",
		scope: "entity.name.function",
		settings: {
			fontStyle: "",
			foreground: "#A6E22E"
		}
	},
	{
		name: "Function argument",
		scope: "variable.parameter",
		settings: {
			fontStyle: "italic",
			foreground: "#FD971F"
		}
	},
	{
		name: "Tag name",
		scope: "entity.name.tag",
		settings: {
			fontStyle: "",
			foreground: "#F92672"
		}
	},
	{
		name: "Tag attribute",
		scope: "entity.other.attribute-name",
		settings: {
			fontStyle: "",
			foreground: "#A6E22E"
		}
	},
	{
		name: "Library function",
		scope: "support.function",
		settings: {
			fontStyle: "",
			foreground: "#66D9EF"
		}
	},
	{
		name: "Library constant",
		scope: "support.constant",
		settings: {
			fontStyle: "",
			foreground: "#66D9EF"
		}
	},
	{
		name: "Library class/type",
		scope: [
			"support.type",
			"support.class"
		],
		settings: {
			fontStyle: "italic",
			foreground: "#66D9EF"
		}
	},
	{
		name: "Library variable",
		scope: "support.other.variable",
		settings: {
			fontStyle: ""
		}
	},
	{
		name: "Invalid",
		scope: "invalid",
		settings: {
			background: "#F92672",
			fontStyle: "",
			foreground: "#F8F8F0"
		}
	},
	{
		name: "Invalid deprecated",
		scope: "invalid.deprecated",
		settings: {
			background: "#AE81FF",
			foreground: "#F8F8F0"
		}
	}
],
	colors: {
		"editor.background": "#272822",
		"editorCursor.foreground": "#F8F8F0",
		"editor.foreground": "#F8F8F2",
		"editorWhitespace.foreground": "#3B3A32",
		"editor.lineHighlightBackground": "#3E3D32",
		"editor.selectionBackground": "#49483E"
	},
	name: "demo-theme"
};

export default baseTheme;
