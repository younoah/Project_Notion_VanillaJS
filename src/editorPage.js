export default function EditorPage({
  $target,
  ininialState,
  onSave,
  onDelete,
  onSelected,
}) {
  const $editorPage = document.createElement("div");
  $editorPage.className = "editorPage";
  $target.appendChild($editorPage);

  this.state = ininialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) {
      $editorPage.innerHTML = "<div>페이지가 삭제되었습니다.</div>";
      return;
    }
    $editorPage.innerHTML = `
        <button class ="delete">삭제하기</button>
        <textarea class= "editor-title">${this.state.title}</textarea>
        <textarea class= "editor-content">${this.state.content}</textarea>

        ${this.state.documents
          .map((document) => {
            return `<span id="${document.id}" class ="child-document">${document.title}</span>`;
          })
          .join("")}
        `;
  };
  let debounce = null;
  $editorPage.addEventListener("keyup", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      console.log(this.state.documents);
      const title = $editorPage.querySelector(".editor-title").value;
      const content = $editorPage.querySelector(".editor-content").value;
      onSave({ title, content, id: this.state.id });
    }, 200);
  });
  $editorPage.addEventListener("click", (e) => {
    if (e.target.id) {
      onSelected(e.target.id);
      return;
    }
    const isDeleteButton = e.target.className === "delete";
    if (isDeleteButton) {
      onDelete(this.state.id);
    }
  });
}
