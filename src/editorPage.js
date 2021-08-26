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
    $editorPage.innerHTML = `
        <textarea class= "editor-title">${this.state.title}</textarea>
        <textarea class= "eidtor-content">${this.state.content}</textarea>
        `;
  };
}
