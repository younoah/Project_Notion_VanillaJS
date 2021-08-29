import { push } from './router.js';

export default function DocsList({ $target, initialState = [], addDoc, deleteDoc}) {
    const $docsList = document.createElement('div');
    $docsList.className = 'doc-list';
    $target.appendChild($docsList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    const makeDocsTree = function (docArr, $target, depth) {
        if (docArr && docArr.length === 0) return;

        const $ul = document.createElement('ul');
        $target.appendChild($ul);

        for (let i = 0; i < docArr.length; i++) {
            const doc = docArr[i];
            // 컨텐츠 에디터블로 변경이 가능할지 고민해보기
            $ul.innerHTML += `
      <li data-id=${doc.id} data-depth=${depth} class='doc-list'>
      <div class='list-container'>
      <div class='doc-title'>${doc.title}</div>
      <button class='delete-button'>del</button>
      <button class='add-button'>add</button>
      </div>
      </li>
      `;
            $ul.addEventListener('click', (e) => onClick(e));
            const $li = $ul.lastElementChild;
            makeDocsTree(doc.documents, $li, depth + 1);
        }
    };

    this.render = () => {
        const $dummy = document.createDocumentFragment();
        makeDocsTree(this.state, $dummy, 0);
        $docsList.innerHTML = ``;
        $docsList.appendChild($dummy);
    };

    let addFlag = false;

    const onClick = (e) => {
        e.stopImmediatePropagation();
        const { target } = e;
        
        if (target.className === 'add-button') {
            if (!addFlag) {
                const $listContainer = target.closest('div[class=list-container]');
                const $input = document.createElement('input');
                $input.style.display = 'block';
                $input.style.margin = '0.5rem 0';
                
                const $li = target.closest('li[class=doc-list]');
                const { id } = $li.dataset;
                
                $input.addEventListener('blur', (e) => {
                    addDoc(e.target.value, id);
                    addFlag = false;
                });

                $listContainer.appendChild($input);
                $input.focus();
                addFlag = true;
            }
        } else if (target.className === 'delete-button') {
            const $li = target.closest('li[class=doc-list]')
            const { id } = $li.dataset;
            deleteDoc(id);
        } else if(target.className === 'doc-title') {
            const $li = target.closest('li[class=doc-list]')
            const { id } = $li.dataset;
            push(`/documents/${id}`);
        }
    };

    this.render();
}
