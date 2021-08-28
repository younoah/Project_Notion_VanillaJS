import Navigation from "./Navigation.js";
import EditPage from "./EditPage.js";
export default function App({ $target, initialState }) {
	/**initialState=
	 * {
	 *    documentTree:[],
	 *    documentTitle: "",
	 *    documentContent: "",
	 *    documentId: null,
	 * }
	 *
	 *
	 */
	const $page = document.createElement("div");
	$page.setAttribute("id", "page");
	$target.appendChild($page);
	$target.appendChild($page);
	this.state = initialState;

	const { documentTree, documentTitle, documentContent, documentId } =
		this.state;
	const navigation = new Navigation({
		$target: $page,
		initialState: {
			documentTree,
		},
	});
	const editPage = new EditPage({
		$target: $page,
		initialState: {
			documentTitle,
			documentContent,
			documentId,
		},
	});
	this.setState = (nextState) => {
		this.state = nextState;
		navigation.setState({}); //add some state
		editPage.setState({}); //add some state
		this.render();
	};
	this.render = () => {};
	this.render();
}
