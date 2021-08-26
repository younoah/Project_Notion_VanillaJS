export default function EditorPage({ $target, ininialState, onSave }) {
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
        <textarea class= "editor-title">${this.state.title}</textarea>
        <textarea class= "editor-content">${this.state.content}</textarea>
        `;
  };
  let debounce = null;
  $editorPage.addEventListener("keyup", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const title = $editorPage.querySelector(".editor-title").value;
      const content = $editorPage.querySelector(".editor-content").value;
      onSave({ title, content, id: this.state.id });
    }, 200);
  });
}
