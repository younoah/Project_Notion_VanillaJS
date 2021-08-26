export default function Nav({
  $target,
  initialState,
  onSelected,
  onRemove,
  onCreate,
}) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.length === 0) {
      $nav.innerHTML = `<button class ="new-document">새문서 추가하기</button>`;
    }
    $nav.innerHTML = `
    <button class ="new-document">새문서 추가하기</button>
        <ul>
        ${this.state
          .map((document) => {
            return ` <li class="${document.id}">${document.title} <button>삭제</button></button></li>`;
          })
          .join("")}
        </ul>`;
  };

  $nav.addEventListener("click", (e) => {
    const targetDocumentId = e.target.className;
    const isButton = e.target.tagName === "BUTTON";
    const isNewButton = e.target.className === "new-document";
    if (isButton && !targetDocumentId) {
      onRemove(e.target.closest("li").className);
    }

    if (targetDocumentId && !isButton) {
      onSelected(targetDocumentId);
    }

    if (isNewButton) {
      onCreate();
    }
  });
  this.render();
}
