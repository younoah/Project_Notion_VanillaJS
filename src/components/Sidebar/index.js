import { requestGET, requestPOST } from '../../utils/api.js'

const ADD_BUTTON_CLASS_NAME = 'Sidebar__add_button'
export default function Sidebar({ $target, initialState, onDocumentClick }) {
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
        <li class="document" data-id="${id}">${title}</li>`
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
      <button class="${ADD_BUTTON_CLASS_NAME}" type="button">루트 도큐먼트 추가</button>
      ${renderDocuments(this.state)}
    `
  }

  const onAddRootDocument = async () => {
    history.pushState(null, null, '/documents/new')

    const title = 'Untitled'
    // 일단 낙관적으로 업데이트하고
    const nextState = [...this.state, { id: 'new', title, documents: [] }]
    this.setState(nextState)

    // 사용자가 아무것도 안하면 그냥 안해주고 싶긴한데.. 일단 생성해봅시다..
    const createdDocument = await requestPOST('/documents', {
      title,
      parent: null,
    })

    console.log(createdDocument)

    await fetchDoucmentsData()
  }

  const fetchDoucmentsData = async () => {
    const documentsData = await requestGET('/documents')
    this.setState(documentsData)
  }

  const init = async () => {
    $sidebar.addEventListener('click', (e) => {
      const { className } = e.target
      if (className) {
        switch (className) {
          case ADD_BUTTON_CLASS_NAME:
            onAddRootDocument()
            break
          case 'document':
            const { id } = e.target.dataset
            onDocumentClick(parseInt(id))
            break
        }
      }
    })

    await fetchDoucmentsData()
  }

  init()
}
