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
  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    nav.setState(this.state);
  };
  const nav = new Nav({
    $target,
    initialState: this.state,
    onSelected: async (id) => {
      await fetchDocument(id);
    },
    onRemove: async (id) => {
      await deleteDocument(id);
      await fetchNav();
      const isCurrentPage = parseInt(id) === parseInt(editorPage.state.id);
      console.log(isCurrentPage);
      if (isCurrentPage) {
        editorPage.setState();
      }
    },
    onCreate: async () => {
      await createDocument();
      fetchNav();
    },
  });
  const editorPage = new EditorPage({
    $target,
    initialState: [],
    onSave: async ({ title, content, id }) => {
      await updateDocument({ title, content, id });
      fetchNav();
    },
  });
  const fetchNav = async () => {
    const result = await getDocuments();
    this.setState(result);
    return result;
  };

  const fetchDocument = async (id) => {
    const result = await getDocumentById(id);
    editorPage.setState(result);
  };

  const updateDocument = async ({ id, title, content }) => {
    await updateDocumentById({ id, title, content });
  };
  fetchNav();
}
