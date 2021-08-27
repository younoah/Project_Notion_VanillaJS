export default function Nav({ $target, initialState, onSelected, onCreate }) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $nav.innerHTML = `<ul class ="document-container"></ul>`;
    const $documentContainer = $nav.querySelector(".document-container");
    const addDocument = document.createElement("button");
    addDocument.className = "new-document";
    addDocument.textContent = "새문서 추가하기";
    this.showChildDocuments = (
      documents = this.state,
      $parent = $documentContainer
    ) => {
      for (const child of documents) {
        const ul = document.createElement("ul");
        const button = document.createElement("button");
        button.className = "new-child-document";
        button.textContent = "+";
        ul.textContent = child.title;
        ul.id = child.id;
        ul.appendChild(button);
        $parent.appendChild(ul);
        if (child.documents.length > 0)
          this.showChildDocuments(child.documents, ul);
      }
    };
    this.showChildDocuments();

    $documentContainer.appendChild(addDocument);
  };

  $nav.addEventListener("click", (e) => {
    event.stopPropagation(e.target);
    const targetDocumentId = e.target.id;
    const isNewDocumentButton = e.target.className === "new-document";
    const isNewChildDocumentButton =
      e.target.className === "new-child-document";

    if (isNewDocumentButton) {
      onCreate();
      return;
    }
    if (isNewChildDocumentButton) {
      onCreate(parseInt(e.target.closest("ul").id));
      return;
    }

    if (targetDocumentId) {
      onSelected(targetDocumentId);
    }
  });
}

/*

<ul>
<li> 말단 문서</li>
<li>  <div>부모 문서</div>
<ul>

</ul>
</li>
</ul>
 */
