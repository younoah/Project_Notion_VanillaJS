import EditHeader from './EditHeader.js';
import { request } from './api.js';
import Editor from './Editor.js';
import { setItem, removeItem, getItem } from './storage.js';

export default function DocEditPage({
    $target,
    initialState = {
        id: '',
        doc: {
            title: '',
            content: '',
        },
    },
}) {
    const $docEditPage = document.createElement('div');
    $docEditPage.className = 'edit-container';

    new EditHeader({
        $target: $docEditPage,
    });

    this.state = initialState;

    let timerForStorage = null;

    let CURRENT_DOC_KEY = `current-doc-${this.state.id}`

    const editor = new Editor({
        $target: $docEditPage,
        intialState: this.state.doc,
        onEditing : async (nextDoc) => {
            if(timerForStorage !== null) {
                clearTimeout(timerForStorage);
            }

            // 2초에 한번꼴로 로컬스토리지에 저장
            timerForStorage = setTimeout(() => {
                setItem(CURRENT_DOC_KEY, {
                    ...nextDoc,
                    savedTime : new Date()
                });

            } ,2000);

            // 10초에 한번꼴로 서버에 저장
            setTimeout(async () => {
                await request(`/documents/${this.state.id}`, {
                    method: 'PUT',
                    body : JSON.stringify(nextDoc)
                })
                
                removeItem(CURRENT_DOC_KEY);
            }, 10000);
        }
    });
    
    this.setState = async (
        nextState = {
            id: '',
            doc: {
                title: '',
                content: '',
            },
        }
    ) => {
        if(this.state.id !== nextState.id) {
            this.state = nextState;
            await fetchDoc();
        }
        editor.setState(this.state.doc);
        this.render();
    };

    this.render = () => {
        $target.appendChild($docEditPage);
    };

    const fetchDoc = async () => {
        const { id } = this.state;
        const { title, content, updated_at } = await request(`/documents/${id}`, {
            method: 'GET'
        });
        
        const tempDoc = getItem(CURRENT_DOC_KEY, {
            title: '',
            content : '',
        })

        if(tempDoc.savedTime && tempDoc.savedTime > updated_at) {
            this.setState({
                ...this.state,
                doc : {
                    title : tempDoc.title,
                    content : tempDoc.content
                }
            })

            await request(`/documents/${id}`, {
                method : 'PUT',
                body : JSON.stringify({
                    title : tmepDoc.title,
                    content : tempDoc.content
                })
            })

            removeItem(CURRENT_DOC_KEY);
        } else {
            this.setState({
                ...this.state,
                doc: {
                    title,
                    content,
                },
            });
        }
    };
}
