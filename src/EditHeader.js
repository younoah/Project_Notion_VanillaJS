export default function EditHeader({$target, initialState = ''}) {
  const $editHeader =document.createElement('div');
  $editHeader.className = 'edit-header';
  $target.appendChild($editHeader);

  this.state = initialState;
}