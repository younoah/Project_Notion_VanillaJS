import { request } from "../api.js";

export default function MainPage({ $target }) {
  const $mainPageContainer = document.createElement("div");
  $mainPageContainer.className = "main-page-container";
  $mainPageContainer.textContent = "MAIN";
  $target.appendChild($mainPageContainer);
  // const fetchDocumentAdd = async () => {
  //   const res = await request("/documents", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: "테스트5",
  //       parent: 615,
  //     }),
  //   });
  //   alert(res);
  // };

  // fetchDocumentAdd();

  // const fetchDocumentDelete = async () => {
  //   await request(`/documents/700`, {
  //     method: "DELETE",
  //   });
  // };
  // fetchDocumentDelete();
}
