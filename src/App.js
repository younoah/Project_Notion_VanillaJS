import Nav from './components/Nav.js';
import Editor from './components/Editor.js';

import { getDocuments } from './api/notion.js';

export default function App($target, initialState) {
	this.state = initialState;

	const nav = new Nav({
		$target,
		initialState: this.state,
		onClick: {},
	});
	const editor = new Editor({
		$target,
		initialState: this.state.currentDocument,
	});
}
