// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import baseTheme from "./tokenTheme";
import editorTheme from "./editorTheme"


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

const randomColor = () =>{
	var options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

	var str = "#";
	for(let x = 0; x < 6; x++){
		str += options[Math.floor(Math.random() * options.length)];
	}
	return str;
};

const randomizeBaseTheme = (theme: themeJson) => {
	theme.textMateRules = theme.textMateRules.map(tm => {
		tm.settings.background = randomColor();
		tm.settings.foreground = randomColor();
		return tm;
	});
	return theme;
};


const randomizeObject = (node : any) =>{

	if(!!Object.keys(node).length){
		Object.keys(node).forEach(key => {
			if(isColor(node[key])){
				node[key] = randomColor();
			}
			else{
				node[key] = randomizeObject(node[key]);
			}
		});
	}
	return node; 
};

const randomizeEditor = (obj: any) => {
	Object.keys(obj).forEach(key => {
		obj[key] = randomColor();
	});
	return obj;
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

		var randomizedTokens = randomizeBaseTheme(baseTheme);
		var randomizedEditor = randomizeEditor(editorTheme);

		vscode.workspace.getConfiguration().update("editor.tokenColorCustomizations", randomizedTokens);
		vscode.workspace.getConfiguration().update("workbench.colorCustomizations", randomizedEditor);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
