import Nav from "./nav.js";
import { getDocuments, getDocumentById } from "./api.js";
import EditorPage from "./editorPage.js";
export default function App({ $target }) {
  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    nav.setState(this.state);
  };
  const nav = new Nav({
    $target,
    initialState: this.state,
    onSelected: (id) => {
      fetchDocument(id);
    },
  });
  const editorPage = new EditorPage({ $target, initialState: [] });
  const fetchNav = async () => {
    const result = await getDocuments();
    this.setState(result);
  };

  const fetchDocument = async (id) => {
    const result = await getDocumentById(id);
    console.log("fetchDocument", result);
    editorPage.setState(result);
  };
  fetchNav();
}
