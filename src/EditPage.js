export default function EditPage({ $target, initialState }) {
	this.state = initialState;
  /**
   * initialState format
   * documentTitle:'',
			documentContent:'',
			documentId=null,
      documentCreatedAt='',
      documentUpdatedAt=''
   * 
   */
	const $editPage = document.createElement("div");
	$editPage.setAttribute("id", "edit-page");
	$target.appendChild($editPage);

  const $editTitle=document.createElement('div')
  const $editContent=document.createElement('div')
  $editPage.appendChild($editTitle)
  $editPage.appendChild($editContent)

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
	this.render = () => {
    const {documentTitle,documentContent,documentId,documentCreatedAt,documentUpdatedAt}=this.state
    // console.log(documentTitle);
    // $editTitle.innerText=documentTitle
    $editTitle.innerHTML=/* html */`
      <textarea rows='1' cols='100'>${documentTitle}</textarea>
    `
		$editContent.innerHTML = /* html */`
    <textarea rows="10" cols="100">
      ${documentContent}
      ${documentId}
      ${documentCreatedAt}
      ${documentUpdatedAt}
    </textarea>
    
    
    `;
	};
	this.render();
}
