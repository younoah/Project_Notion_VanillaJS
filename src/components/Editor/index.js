import { requestGET, requestPATCH } from '../../utils/api.js'

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
      <input name="title" type="text" value="${title}"/>
      <textarea name="content">${content} </textarea>
    `
  }

  this.render()
}
