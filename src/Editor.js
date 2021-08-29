export default function Editor({
    $target,
    initialState = {
        title: '',
        content: '',
    },
    onEditing
}) {
    const $editor = document.createElement('div');
    $editor.className = 'editor'
    $target.appendChild($editor);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
      const { title, content } = this.state;

      $editor.innerHTML =
      `
      <div class='title-container'>
      <label for='title'>title</label>
      <input id='title' value='${title}'>
      </div>
      <div class='content-container'>
      <div class='subject'>content</div>
      <div class='content' contentEditable='true'>${content ? content : ''}</div>
      </div>
      `
    };

    $editor.addEventListener('keyup', e => {
        const { target } = e;
        if(target.className === 'content') {
            const nextDoc = {
                    ...this.state,
                    content : target.textContent
            }
            onEditing(nextDoc);
        } else if(target.tagName ==='INPUT') {
            const nextDoc = {
                ...this.state,
                title : target.value
            }
            onEditing(nextDoc);
        }
    })

    this.render();
}
