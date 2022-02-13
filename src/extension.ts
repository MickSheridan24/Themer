// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import baseTheme from "./tokenTheme";
import editorTheme from "./editorTheme";
import Color from "./colorManagers";

interface themeJson {
	textMateRules: tokenColor[],
	name: string,
	colors: colors
}

interface themeSettings {
	background?: string,
	foreground?: string,
	fontStyle?: string
}

interface tokenColor{
	name?: string, 
	scope?: string | string[],
	settings: themeSettings
}

interface colors{
	"editor.background" : string, 
	"editorCursor.foreground": string,
	"editor.foreground": string,
	"editorWhitespace.foreground": string,
	"editor.lineHighlightBackground": string,
	"editor.selectionBackground": string,
	
}

const isColor = (val: any) => typeof(val) === "string" && (val as string).startsWith("#")

interface randomHSLOptions{
	maxSat?: number,
	minSat?: number,
	maxLum?: number,
	minLum?: number,
	setHue?: number, 
}

const randomHSLColor = (options: randomHSLOptions) => {
	let {maxSat,  minSat, maxLum, minLum, setHue} = options; 
	maxSat = maxSat ?? 100;
	maxLum = maxLum ?? 100;
	minLum = minLum ?? 0;
	minSat = minSat ?? 0;
	var lumDiff = maxLum - minLum;
	var satDiff = maxSat - minSat;
	const hue = !setHue ? Math
	.floor(Math.random() * 360) : setHue!; 
	const sat = Math.floor(Math.random() * satDiff) + minSat;
	const lum = Math.floor(Math.random() * lumDiff) + minLum;
	
	return {h: hue, s: sat, l: lum};
};





const splitComplimentEditor = (theme: any, baseColor: Color, textColor: Color) => {



	assignColors(theme.foregrounds,[textColor.tetradics.first, textColor.tetradics.second, textColor.tetradics.third, textColor.base]);
	assignColors(theme.backgrounds, [baseColor.triadics.first, baseColor.triadics.second, baseColor.base]);
	assignColors(theme, [baseColor.compliment]);

	var out = {...theme};
	Object.keys(theme.foregrounds).forEach(k => {
		out[k] = theme.foregrounds[k];
	});
	Object.keys(theme.backgrounds).forEach(k => {
		out[k] = theme.backgrounds[k];
	});
	return out;
};



const assignColors = (obj: any, colors: string[]) =>{
	Object.keys(obj).forEach(k => {
		if(k !== "foregrounds" && k !== "backgrounds"){
			var rand = Math.floor(Math.random() * colors.length);
			obj[k] = colors[rand];
		}
	});
}

const randomizeBaseTheme = (theme: themeJson, themeColor: Color) => {


	theme.textMateRules = theme.textMateRules.map(tm => {
		tm.settings.foreground = themeColor.randomAspect();
		return tm;
	});
	return theme;
}


export function activate(context: vscode.ExtensionContext) {
	

	console.log('Congratulations, your extension "themer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('themer.randomizeTheme', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		 vscode.window.showInformationMessage('Randomize!');

		 var hsl = randomHSLColor({
			maxLum: 50,
			minLum: 0,
			maxSat: 100,
			minSat: 0,
		});
		var textHsl = randomHSLColor({
			setHue: hsl.h,
			maxLum: 100,
			minLum: 50,
			maxSat: 100,
			minSat: 0,
		});
		var baseColor = Color.fromHSL(hsl);
		var textColor = Color.fromHSL(textHsl);

		 var randomizedTokens = randomizeBaseTheme(baseTheme, textColor);
		var randomizedEditor = splitComplimentEditor(editorTheme, baseColor, textColor);

		vscode.workspace.getConfiguration().update("editor.tokenColorCustomizations", randomizedTokens);
		vscode.workspace.getConfiguration().update("workbench.colorCustomizations", randomizedEditor);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
