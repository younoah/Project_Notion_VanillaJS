import { request } from "../api.js";

export default function DocumentList({
  $target,
  init = [],
  onSelect,
  onCreate,
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list-container";
  $target.appendChild($documentList);

  // 재귀를 활용한 노션 리스트
  const renderDocuments = (parentsDocuments, textIndent = 0) => {
    return parentsDocuments
      .map(
        ({ id, title, documents }) =>
          `<li class='document-item' styled='text-indent=${textIndent}em;'data-state="folded" data-id="${id}">${title}
          ${
            documents.length > 0
              ? `<ul>${renderDocuments(documents, (textIndent += 2))}</ul>`
              : ""
          }
        </blockquote>`
      )
      .join("");
  };

  this.state = init;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $documentList.innerHTML = `
        <ul>
        ${this.state.length > 0 && renderDocuments(this.state)}
        </ul>
        `;
  };

  $documentList.addEventListener("click", async (e) => {
    const $li = e.target.closest(".document-item");
    if ($li) {
      // const { id } = $li.dataset;
      // const $childDocumentList = document.createElement("ul");
      // const childDocument = await request(`/documents/${id}`);
      // console.log(childDocument);
      // $childDocumentList.innerHTML = `
      //   ${childDocument.documents
      //     .map(({ id, title }) => `<li data-id="${id}">${title}</li>`)
      //     .join("")}
      // `;
      // $li.appendChild($childDocumentList);
      onSelect($li);
    }
  });

  this.render();
}
