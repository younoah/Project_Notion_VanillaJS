export default function AddDockButton({ $target, initialState, onClick }) {
    const $addButton = document.createElement('button');
    $addButton.className = 'add-doc-button'
    this.state = initialState;
    $addButton.textContent = this.state;

    this.render = () => {
        $target.appendChild($addButton);
    };

    $addButton.addEventListener('click', onClick);

    this.render();
}