import { request } from "../api.js";
import DocumentList from "./DocumentList.js";
import Profile from "./Profile.js";

export default function SidePage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "side-page-container";
  $target.appendChild($page);

  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new Profile({
    $target: $page,
    init: {
      name: "minsgy",
    },
  });
  const documentList = new DocumentList({
    $target: $page,
    init: [],
    onSelect: async (id) => {
      // const documentContent = await request(`/documents/${id}`);
      // documentContent.documents;
      console.log(id);
    },
    onCreate: (id) => {
      console.log(`onCreate : ${id}`);
    },
  });
  this.render = async () => {
    const documents = await request("/documents");
    console.log(documents);
    documentList.setState(documents);
  };
  this.render();
}
