export default function Nav({ $target, initialState, onSelected }) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = `
        <ul>
        ${this.state
          .map((document) => {
            return ` <li class="${document.id}">${document.title} </li>`;
          })
          .join("")}
        </ul>`;
  };

  $nav.addEventListener("click", (e) => {
    const targetDocumentId = e.target.className;
    if (targetDocumentId) {
      onSelected(targetDocumentId);
    }
  });
  this.render();
}
