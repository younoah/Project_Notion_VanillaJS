import Nav from "./nav.js";
import {
  getDocuments,
  getDocumentById,
  updateDocumentById,
  createDocument,
  deleteDocument,
} from "./api.js";
import EditorPage from "./editorPage.js";
export default function App({ $target }) {
  const onSelected = async (id) => {
    history.pushState(null, null, id);
    await fetchDocument();
  };

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    nav.setState(this.state);
  };
  const nav = new Nav({
    $target,
    initialState: this.state,
    onSelected,
    onCreate: async (id = null) => {
      const parentDocument = await getDocumentById(id);
      console.log(parentDocument);
      await createDocument(parentDocument);
      fetchNav();
      fetchDocument();
    },
  });
  const editorPage = new EditorPage({
    $target,
    initialState: [],
    onSave: async ({ title, content, id }) => {
      await updateDocument({ title, content, id });
      fetchNav();
    },
    onSelected: onSelected,
    onDelete: async (id) => {
      await deleteDocument(id);
      history.replaceState(null, null, "/");
      fetchDocument();
      fetchNav();
    },
  });
  const fetchNav = async () => {
    const result = await getDocuments();
    this.setState(result);
    return result;
  };

  const fetchDocument = async () => {
    const id = window.location.pathname.substr(1);
    if (id.length > 0) {
      const result = await getDocumentById(id);
      editorPage.setState(result);
    } else {
      editorPage.setState(null);
    }
  };

  const updateDocument = async ({ id, title, content }) => {
    await updateDocumentById({ id, title, content });
  };
  fetchNav();

  window.addEventListener("popstate", () => {
    fetchDocument();
  });
  window.addEventListener("load", () => {
    fetchDocument();
  });
}
