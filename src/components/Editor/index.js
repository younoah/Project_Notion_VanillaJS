export default function Editor({ $target }) {
  const $editor = document.createElement('div')
  $editor.className = 'Editor'

  $target.appendChild($editor)

  this.state = {
    title: 'Untitled',
    content: 'nope',
  }

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
