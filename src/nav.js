export default function Nav({ $target, initialState, onSelected, onCreate }) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = `<button class ="new-document">문서추가</button>
    <ul>${this.state
      .map((document) => {
        return `<li id ="${document.id}">${document.title}<button class ="new-child-document">+</button></li>`;
      })
      .join("")}</ul>    
    `;
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
      onCreate(parseInt(e.target.closest("li").id));
      return;
    }

    if (targetDocumentId) {
      onSelected(targetDocumentId);
    }
  });
  this.render();
}
