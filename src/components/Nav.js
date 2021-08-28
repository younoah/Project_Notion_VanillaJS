export default function Nav({ $target, initialData }) {
	const $nav = document.createElement('nav');
	$target.appendChild($nav);

	this.state = initialData;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.drawNav = (target, state) => {
		const $ul = document.createElement('ul');

		state.forEach(item => {
			const { id, title, documents } = item;
			const $li = document.createElement('li');
			$li.setAttribute('data-id', id);
			$li.textContent = title;

			if (documents.length > 0) {
				this.drawNav($li, documents);
			}

			$ul.appendChild($li);
		});
		target.appendChild($ul);
	};

	this.render = () => {
		this.drawNav($nav, this.state);
	};

	this.render();
}
