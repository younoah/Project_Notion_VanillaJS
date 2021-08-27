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
  const onRemove = async (id) => {
    const currentPage = window.location.pathname.substr(1);
    const isCurrentPageDeleted = parseInt(currentPage) === id;
    if (isCurrentPageDeleted) {
      history.replaceState(null, null, "/");
    }
    await deleteDocument(id);
    fetchDocument();
    fetchNav();
  };
  const onSelected = async (id) => {
    history.pushState(null, null, id);
    await fetchDocument();
  };

  const onCreate = async (id = null) => {
    if (id) {
      // 부모문서가 있는 경우
      const parentDocument = await getDocumentById(id);
      await createDocument(parentDocument);
      const newParentDocument = await getDocumentById(id);
      const newChild =
        newParentDocument.documents[newParentDocument.documents.length - 1];
      history.pushState(null, null, newChild.id);
    } else {
      // 루트에 생성할 경우
      await createDocument();
      const documents = await fetchNav();
      const newDocument = documents[documents.length - 1];
      history.pushState(null, null, newDocument.id);
    }
    fetchNav();
    fetchDocument();
  };

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
  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    nav.setState(this.state);
  };
  const onSave = async ({ title, content, id }) => {
    await updateDocument({ title, content, id });
    fetchNav();
  };
  const nav = new Nav({
    $target,
    initialState: this.state,
    onSelected,
    onCreate,
    onRemove,
  });
  const editorPage = new EditorPage({
    $target,
    initialState: [],
    onSave,
    onSelected,
    onRemove,
  });
  fetchNav();

  window.addEventListener("popstate", () => {
    fetchDocument();
  });
  window.addEventListener("load", () => {
    fetchDocument();
  });
}
