import { requestGET, requestPUT } from '../../utils/api.js'

const EDITOR_NAMES = {
  TITLE: 'title',
  CONTENT: 'content',
}

export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div')
  $editor.className = 'Editor'

  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { title, content } = this.state
    $editor.innerHTML = `
      <input name="${EDITOR_NAMES.TITLE}" type="text" value="${title}"/>
      <textarea name="${EDITOR_NAMES.CONTENT}">${content} </textarea>
    `
  }

  const init = async () => {
    $editor.addEventListener('keyup', async (e) => {
      const { name, value } = e.target
      if (name) {
        switch (name) {
          case EDITOR_NAMES.TITLE:
            this.state.title = value
            // localStorage, setState
            break
          case EDITOR_NAMES.CONTENT:
            this.state.content = value
            //localStorage setSTate
            break
          default:
            break
        }

        const { selectedDocumentId, title, content } = this.state
        await requestPUT(`/documents/${selectedDocumentId}`, {
          title,
          content,
        })
      }
    })

    const { selectedDocumentId } = this.state
    if (selectedDocumentId) {
      const selectedDocument = await requestGET(
        `documents/${selectedDocumentId}`,
      )

      this.setState({
        ...this.state,
        selectedDocument,
      })
    }
  }

  init()
}
