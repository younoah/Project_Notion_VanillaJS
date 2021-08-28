export default function Navigation({ $target, initialState }) {
	/**
	 * initialState={
	 *    documentTree:[]
	 * }
	 *
	 *
	 */
	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const $navPage = document.createElement("div");
	$navPage.setAttribute("id", "nav-page");
	$target.appendChild($navPage);
	this.render = () => {
		const { documentTree } = this.state;
		$navPage.innerHTML = /* html */ `
    <ul class="doc-ul">
      ${documentTree
				.map(
					(doc) => /* html */ `
        <li class="doc-li" id='doc${doc.id}'>
          <span class='class-doc-carot' id='carot${
						doc.id
					}'><i class="fas fa-caret-right"></i>  </span> 
          <span class='class-doc-title' id='title${doc.id}'>${doc.title}</span>
          <span class="plus-button" id='plusBtn${doc.id}'>+</span>
          <div>
            ${doc.documents.length !== 0 ? openDocumentTree(doc.documents) : ""}
          </div><!-- 하위 도큐먼츠 저장하는 공간 디폴트 display:hidden 이고 li 상태에 따라 해당 내용은 visible로 왔다갔다함. -->
        </li>
      `
				)
				.join("")}
    </ul>
    
    `;
	};
	this.render();

	$navPage.addEventListener("click", (e) => {
		const $carot = e.target.closest(".class-doc-carot");
		const $title = e.target.closest(".class-doc-title");
		const $plusButton = e.target.closest(".plus-button");
		console.log($carot);
		console.log($title);
		console.log($plusButton);
	});
}
//carot 누르면 li부분이 뜨고  ++ carot.innerHTML로 캐롯 종류 토글 가능하다!!!!
// doc.title 누르면 해당 도큐먼트의 컨텐츠가 뜨고
// +를 누르면 아래 트리에 페이지가 추가된다.
function openDocumentTree(documents) {
	if (documents.length === 0) {
		return;
	}
	return /* html */ `
  <ul class="doc-ul">
      ${documents
				.map(
					(doc) => /* html */ `
        <li class="doc-li" id='doc${doc.id}'>
          <span class='class-doc-carot' id='carot${
						doc.id
					}'><i class="fas fa-caret-right"></i>  </span> 
          <span class='class-doc-title' id='title${doc.id}'>${doc.title}</span>
          <span class="plus-button" id='plusBtn${doc.id}'>+</span>
          <div>
            ${doc.documents.length !== 0 ? openDocumentTree(doc.documents) : ""}
          </div><!-- 하위 도큐먼츠 저장하는 공간 디폴트 display:hidden 이고 li 상태에 따라 해당 내용은 visible로 왔다갔다함. -->
        </li>
      `
				)
				.join("")}
    </ul>
  
  `;
}
/**
 * li.parent-doc 잡을 때 closest 써야 한다.
 *
 */
