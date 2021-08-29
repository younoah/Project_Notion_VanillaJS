import Navigation from "./Navigation.js";
import EditPage from "./EditPage.js";
import { request } from "./api.js";
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
    onClickTitle:async ($title,_id)=>{
      console.log($title)
      console.log(` id: ${_id}`)
      // const selectedDoc=await request(`/${_id}`,{
      //   method:'GET'
      // })
      // api에 저장된 값이 없기 떄문에 우선은 더미로 랜더링한다..
      const DUMMY_DOC={
        "id": 1,
        "title": "노션을 만들자",
        "content": "즐거운 자바스크립트의 세계!",
        "documents": [
          {
            "id": 2,
            "title": "",
            "createdAt": "",
            "updatedAt": ""
          }
        ],
        "createdAt": "2021.08.01",
        "updatedAt": "2021.08.03"
      }
      // console.log(DUMMY_DOC);
      editPage.setState({
        documentTitle:DUMMY_DOC.title,
        documentContent:DUMMY_DOC.content,
        documentId:DUMMY_DOC.id,
        documentCreatedAt:DUMMY_DOC.createdAt,
        documentUpdatedAt:DUMMY_DOC.updatedAt
      })
    },
    onClickPlus:($plusButton)=>{
      console.log($plusButton)
    }
	});
	const editPage = new EditPage({
		$target: $page,
		initialState: {
			documentTitle:'',
			documentContent:'',
			documentId:'',
      documentCreatedAt:'',
      documentUpdatedAt:''
		},
	});
	this.setState = (nextState) => {
		this.state = nextState;
		navigation.setState({}); //add next state
		editPage.setState({}); //add next state
		this.render();
	};
	this.render = () => {};
	this.render();
}
