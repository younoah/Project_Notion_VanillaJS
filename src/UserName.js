export default function UserName({$target, initialState}) {
  const $userName = document.createElement('div');
  $userName.className = 'username'
  $target.appendChild($userName);

  this.state = initialState;

  this.setState =nextState => {
    this.state = nextState;
    this.render();
  }

  this.render =() => {
    $userName.innerHTML = `
      ${this.state}님의 Notion
    `
  }

  this.render();
}