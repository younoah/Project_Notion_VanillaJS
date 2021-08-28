export default function EditPage({ $target, initialState }) {
	this.state = initialState;

	const $editPage = document.createElement("div");
	$editPage.setAttribute("id", "edit-page");
	$target.appendChild($editPage);
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
	this.render = () => {
		$editPage.innerHTML = `body testing`;
	};
	this.render();
}
