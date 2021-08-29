import { requestGET, requestPOST } from '../../utils/api.js'

const SIDEBAR_CLASSES = {
  DOCUMENT: 'Sidebar__Document',
  DOCUMENT_REMOVE_BUTTON: 'Sidebar__RemoveButton',
  DOCUMENT_ADD_BUTTON: 'Sidebar__AddButton',
}

export default function Sidebar({
  $target,
  initialState,
  onDocumentClick,
  onAddDocument,
  onDeleteDocument,
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
            <button type="button" class="${SIDEBAR_CLASSES.DOCUMENT_ADD_BUTTON}"> 하위 도큐먼트 추가 </button>
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
      <button class="${SIDEBAR_CLASSES.DOCUMENT_ADD_BUTTON}" type="button">
        루트 도큐먼트 추가
      </button>
      ${renderDocuments(this.state)}
    `
  }

  const init = async () => {
    $sidebar.addEventListener('click', async (e) => {
      const { className } = e.target
      if (className) {
        switch (className) {
          case SIDEBAR_CLASSES.DOCUMENT:
            const { id } = e.target.dataset
            onDocumentClick(parseInt(id))
            break

          case SIDEBAR_CLASSES.DOCUMENT_ADD_BUTTON: {
            const $li = e.target.closest(`.${SIDEBAR_CLASSES.DOCUMENT}`)
            let parent = null

            if ($li) {
              const { id } = $li.dataset
              parent = id
            }

            const document = {
              title: 'Untitled',
              parent,
            }

            onAddDocument(document)

            break
          }

          case SIDEBAR_CLASSES.DOCUMENT_REMOVE_BUTTON: {
            const $li = e.target.closest(`.${SIDEBAR_CLASSES.DOCUMENT}`)
            if ($li) {
              const { id } = $li.dataset

              onDeleteDocument(id)
            }
            break
          }
        }
      }
    })
  }

  init()
}
