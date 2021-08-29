import { requestGET, requestPOST } from '../../utils/api.js'

const SIDEBAR_CLASSES = {
  DOCUMENT: 'Sidebar__Document',
  ROOT_DOCUMENT_ADD_BUTTON: 'Sidebar__RootAddButton',
  CHILD_DOCUMENT_ADD_BUTTON: 'Sidebar__ChildAddButton',
}

export default function Sidebar({
  $target,
  initialState,
  onDocumentClick,
  onAddDocument,
}) {
  // TODO: initialState Type cecheking, call without new Operator validator
  const $sidebar = document.createElement('div')

  $target.appendChild($sidebar)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  // TODO : while문으로 바꿔주기
  const renderDocuments = (documents) => {
    return documents
      .map((document) => {
        const { id, title, documents } = document
        let result = `
        <div class="PageBlock">
          <li class="${SIDEBAR_CLASSES.DOCUMENT}" data-id="${id}">
            ${title}
            <button type="button" class="${SIDEBAR_CLASSES.DOCUMENT_REMOVE_BUTTON}"> 삭제 </button>
            <button type="button" class="${SIDEBAR_CLASSES.CHILD_DOCUMENT_ADD_BUTTON}"> 하위 도큐먼트 추가 </button>
          </li>`
        if (documents?.length !== 0) {
          const child = renderDocuments(documents)
          result += child
        }
        result += `</div>`
        return result
      })
      .join('')
  }

  this.render = () => {
    $sidebar.innerHTML = `
      <button class="${SIDEBAR_CLASSES.ROOT_DOCUMENT_ADD_BUTTON}" type="button">
        루트 도큐먼트 추가
      </button>
      ${renderDocuments(this.state)}
    `
  }

  const onAddRootDocument = async () => {
    const document = {
      title: 'Untitled',
      parent: null,
    }

    onAddDocument(document)

    await fetchDocumentsData()
  }

  const onAddChildDocument = async (parent) => {
    const document = {
      title: 'Untitled',
      parent: parent,
    }

    onAddDocument(document)

    await fetchDocumentsData()
  }

  const fetchDocumentsData = async () => {
    const documentsData = await requestGET('/documents')
    this.setState(documentsData)
  }

  const init = async () => {
    $sidebar.addEventListener('click', (e) => {
      const { className } = e.target
      if (className) {
        switch (className) {
          case SIDEBAR_CLASSES.DOCUMENT:
            const { id } = e.target.dataset
            onDocumentClick(parseInt(id))
            break

          case SIDEBAR_CLASSES.ROOT_DOCUMENT_ADD_BUTTON:
            onAddRootDocument()
            break

          case SIDEBAR_CLASSES.CHILD_DOCUMENT_ADD_BUTTON:
            const $li = e.target.closest(`.${SIDEBAR_CLASSES.DOCUMENT}`)
            if ($li) {
              const { id } = $li.dataset
              onAddChildDocument(id)
            }
            break
        }
      }
    })

    await fetchDocumentsData()
  }

  init()
}
