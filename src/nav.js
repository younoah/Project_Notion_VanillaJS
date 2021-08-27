export default function Nav({
  $target,
  initialState,
  onSelected,
  onCreate,
  onRemove,
}) {
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
        const addButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-document";
        deleteButton.textContent = "X";
        addButton.className = "new-child-document";
        addButton.textContent = "+";
        ul.textContent = child.title;
        ul.id = child.id;
        ul.append(addButton);
        ul.prepend(deleteButton);
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
    const isDeletebutton = e.target.className === "delete-document";
    const isNewDocumentButton = e.target.className === "new-document";
    const isNewChildDocumentButton =
      e.target.className === "new-child-document";

    if (isDeletebutton) {
      onRemove(parseInt(e.target.closest("ul").id));
      return;
    }
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
