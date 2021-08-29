export default function Editor({ $target, initialState }) {
	const $editor = document.createElement('main');
	$target.appendChild($editor);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { title, content } = this.state;
		$editor.innerHTML = `
			<div>${title}</div>
			${content ? `<div>${content}</div>` : `<div>컨텐츠가 없습니다.</div>`}
		`;
	};

	this.render();
}
