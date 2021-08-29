import { requestDELETE, requestGET, requestPOST } from '../utils/api.js'
import Editor from './Editor/index.js'
import Sidebar from './Sidebar/index.js'

/*
{
  documents: Array,
  selectedDocumentId: number,
  title: string,
  content: string
}
*/

export default function App({ $target }) {
  this.state = {
    documents: [],
    selectedDocumentId: null,
    title: '',
    content: '',
  }

  this.setState = (nextState) => {
    this.state = nextState

    const { documents, selectedDocumentId, title, content } = this.state

    sidebar.setState(documents)

    editor.setState({
      title,
      content,
      selectedDocumentId,
    })
  }

  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documents,
    onDocumentClick: async (selectedDocumentId) => {
      const selectedDocument = await requestGET(
        `/documents/${selectedDocumentId}`,
      )

      this.setState({
        ...this.state,
        selectedDocumentId,
        title: selectedDocument.title,
        content: selectedDocument.content,
      })
    },
    onAddDocument: async (document) => {
      history.pushState(null, null, '/documents/new')

      const createdDocument = await requestPOST('/documents', document)

      this.setState({
        ...this.state,
        selectedDocumentId: createdDocument.id,
        title: createdDocument.title,
        content: createdDocument.content,
      })

      history.replaceState(null, null, `/documents/${createdDocument.id}`)

      await fetchDocuments()
    },
    onDeleteDocument: async (id) => {
      await requestDELETE(`/documents/${id}`)

      await fetchDocuments()
    },
  })

  const editor = new Editor({
    $target,
    initialState: {
      selectedDocumentId: this.state.selectedDocumentId,
      title: 'Untitled',
      content: '',
    },
  })

  const fetchDocuments = async () => {
    const documents = await requestGET('/documents')
    this.setState({
      ...this.state,
      documents,
    })
  }

  const init = async () => {
    const { pathname } = location
    const [, , selectedDocumentId] = pathname.split('/')

    if (selectedDocumentId) {
      this.setState({
        ...this.state,
        selectedDocumentId,
      })
    }

    await fetchDocuments()
  }

  init()
}
