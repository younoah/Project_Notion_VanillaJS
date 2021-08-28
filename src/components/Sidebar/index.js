export default function Sidebar({ $target, initialState }) {
  // TODO: initialState Type cecheking, call without new Operator validator
  const $sidebar = document.createElement("div");

  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // TODO : while문으로 바꿔주기
  const renderDocuments = (documents) => {
    return documents
      .map((document) => {
        const { id, title, documents } = document;
        let result = `<div class="PageBlock"> <li data-id="${id}">${title}</li>`;
        if (documents?.length !== 0) {
          const child = renderDocuments(documents);
          result += child;
        }
        result += `</div>`;
        return result;
      })
      .join("");
  };

  this.render = () => {
    $sidebar.innerHTML = renderDocuments(this.state);
  };

  this.render();
}
