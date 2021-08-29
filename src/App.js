import Nav from './components/Nav.js';
import Editor from './components/Editor.js';

const DUMMY_DATA = [
	{
		id: 1, // Document id
		title: '노션을 만들자', // Document title
		documents: [
			{
				id: 2,
				title: '블라블라',
				documents: [
					{
						id: 3,
						title: '함냐함냐',
						documents: [],
					},
					{
						id: 5,
						title: '뎁스 테스트',
						documents: [
							{
								id: 6,
								title: '완벽한 트리~',
								documents: [],
							},
						],
					},
				],
			},
		],
	},
	{
		id: 4,
		title: 'hello!',
		documents: [],
	},
];

export default function App($target) {
	const initialState = DUMMY_DATA;

	this.state = initialState;
	this.setState = nextState => {
		this.state = initialState;
	};

	const nav = new Nav({
		$target,
		initialState,
		onClick: id => {
			const prevItem = document.querySelector('.selected');
			const currentItem = document.querySelector(`[data-id="${id}"]`);

			if (prevItem) {
				prevItem.classList.remove('selected');
			}
			currentItem.classList.add('selected');
		},
	});

	const editor = new Editor({
		$target,
		initialState,
	});
}
