import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Global Snippet extension is now active!');

	// 注册右键保存代码片段命令
	const saveCodeCommand = vscode.commands.registerCommand('ui.saveCodeAsSnippet', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('没有活动的编辑器窗口！');
			return;
		}

		const supportedLanguages = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact', 'html'];
		if (!supportedLanguages.includes(editor.document.languageId)) {
			vscode.window.showErrorMessage('当前语言不支持保存代码片段！');
			return;
		}

		const selectedText = editor.document.getText(editor.selection);
		if (!selectedText) {
			vscode.window.showErrorMessage('请先选中一段代码！');
			return;
		}

		const snippetName = await vscode.window.showInputBox({
			prompt: '输入代码片段的名称',
			placeHolder: '例如：ui.name',
		});

		if (!snippetName) {
			vscode.window.showErrorMessage('代码片段名称不能为空！');
			return;
		}

		const snippetDescription = await vscode.window.showInputBox({
			prompt: '输入代码片段的描述（可选）',
			placeHolder: '例如：常用的 React 组件模板',
		});

		const savedSnippets = context.globalState.get<Record<string, { content: string; description: string }>>('snippets', {});
		const updatedSnippets = {
			...savedSnippets,
			[snippetName]: { content: selectedText, description: snippetDescription || '' },
		};
		await context.globalState.update('snippets', updatedSnippets);

		vscode.window.setStatusBarMessage(`代码片段 "${snippetName}" 已保存！`, 3500);
	});

	// 注册显示和删除代码片段命令
	const manageSnippetsCommand = vscode.commands.registerCommand('ui.manageSnippets', async () => {
		const savedSnippets = context.globalState.get<Record<string, { content: string; description: string }>>('snippets', {});

		if (!savedSnippets || Object.keys(savedSnippets).length === 0) {
			vscode.window.showInformationMessage('没有已保存的代码片段！');
			return;
		}

		// 显示代码片段列表供用户选择删除
		const snippetName = await vscode.window.showQuickPick(
			Object.keys(savedSnippets).map((name) => ({
				label: name,
				description: savedSnippets[name].description || '无描述',
			})),
			{
				placeHolder: '选择要删除的代码片段',
			}
		);

		if (snippetName) {
			const confirm = await vscode.window.showWarningMessage(
				`确定要删除代码片段 "${snippetName.label}" 吗？`,
				{ modal: true },
				'确认'
			);

			if (confirm === '确认') {
				const updatedSnippets = { ...savedSnippets };
				delete updatedSnippets[snippetName.label];
				await context.globalState.update('snippets', updatedSnippets);

				vscode.window.setStatusBarMessage(`代码片段 "${snippetName.label}" 已删除！`, 3500);
			} else {
				vscode.window.setStatusBarMessage('操作已取消', 3500);
			}
		}
	});

	// 注册代码补全提供器
	const completionProvider = vscode.languages.registerCompletionItemProvider(
		[
			{ language: 'javascript', scheme: 'file' },
			{ language: 'typescript', scheme: 'file' },
			{ language: 'javascriptreact', scheme: 'file' },
			{ language: 'typescriptreact', scheme: 'file' },
			{ language: 'html', scheme: 'file' },
		],
		{
			provideCompletionItems(document, position, token) {
				const savedSnippets = context.globalState.get<Record<string, { content: string; description: string }>>('snippets', {});

				return Object.keys(savedSnippets || {}).map((snippetName) => {
					const snippet = savedSnippets[snippetName];

					// 创建补全项
					const item = new vscode.CompletionItem(snippetName, vscode.CompletionItemKind.Snippet);

					// 设定代码片段内容
					item.insertText = new vscode.SnippetString(snippet.content);

					// 设定补全项的描述（显示在补全框中）
					item.detail = `${snippetName} - ${snippet.description || '无描述'}`;

					// 设定文档部分，展示代码片段的具体内容
					item.documentation = new vscode.MarkdownString(
						`\`\`\`\n${snippet.content}\n\`\`\`\n\n${snippet.description ? snippet.description : '无描述'}`
					);

					return item;
				});
			},
		}
	);


	context.subscriptions.push(saveCodeCommand, manageSnippetsCommand, completionProvider);
}

export function deactivate() { }

