export default function Nav({ $target, initialState, onSelected, onCreate }) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.length === 0) {
      $nav.innerHTML = `<button class ="new-document">+</button>`;
    }
    $nav.innerHTML = `
    <button class ="new-document">+</button>
        <ul>
        ${this.state
          .map((document) => {
            return ` <li id="${document.id}">${document.title}<button class="new-child-document">+</button> </li>`;
          })
          .join("")}
        </ul>`;
  };

  $nav.addEventListener("click", (e) => {
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
