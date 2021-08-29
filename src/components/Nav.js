export default function Nav({ $target, initialState, onClick }) {
	const $nav = document.createElement('nav');
	$target.appendChild($nav);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.drawNav = (target, state) => {
		const $ul = document.createElement('ul');

		state.forEach((item, index) => {
			const { id, title, documents } = item;
			const $li = document.createElement('li');
			const $span = document.createElement('span');

			if (id === this.state.currentDocument['id']) {
				$span.classList.add('selected');
			}
			$span.setAttribute('data-id', id);
			$span.textContent = title;
			$li.appendChild($span);

			if (documents.length > 0) {
				this.drawNav($li, documents);
			}

			$ul.appendChild($li);
		});

		target.appendChild($ul);
	};

	$nav.addEventListener('click', e => {
		if (e.target.tagName !== 'SPAN') return;

		const { id } = e.target.dataset;
		onClick.getDocument(parseInt(id));
	});

	this.render = () => {
		this.drawNav($nav, this.state.allDocuments);
	};

	this.render();
}
