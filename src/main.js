import App from "./App.js";
import {request} from './api.js'

const $target = document.querySelector("#app");

// const documentTree=await request("",{
//   method:'GET'
// })
// console.log(documentTree)
// const docExample=await request('/{0}',{
//   method:'GET'
// })
// console.log(docExample);
// api 호출은 성공했고, 계층화에 관련 확인은 DUMMY데이터가 유용해서 우선은 더미 데이터 사용한다!!!!
const DUMMY_DOC_TREE=[
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "documents": [
      {
        "id": 2,
        "title": "블라블라",
        "documents": [
          {
            "id": 3,
            "title": "함냐함냐",
            "documents": []
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "documents": []
  }
]

const initialState = {
	documentTree: DUMMY_DOC_TREE,
	documentTitle: "",
	documentContent: "",
	documentId: null,
};
new App({
	$target,
	initialState,
});
