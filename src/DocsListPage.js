import DocsList from './DocsList.js';
import SidebarHeader from './SidebarHeader.js';
import { request } from './api.js';

export default function DocsListPage ({$target, initialState = []}) {
  const $page = document.createElement('div');
  $page.className = 'sidebar';

  new SidebarHeader({
    $target : $page,
    onClick : async () => {
      await request('/documents', {
        method : 'POST',
        body :  JSON.stringify({
          title : 'new doc',
          parent : null
        })
      })
      
      fetchDocsList();
    }
  })

  const docsList = new DocsList({
    $target : $page,
    initialState : [],
    addDoc : async (title, parentId) => {
      await request(`/documents`, {
        method : 'POST',
        body : JSON.stringify({
          title : title.length > 0 ? title : 'new doc',
          parent : parentId
        })
      })
      
      fetchDocsList();
    },
    deleteDoc : async (id) => {
      await request(`/documents/${id}`, {
        method : 'DELETE'
      })

      fetchDocsList();
    },
  })

  this.state = initialState;

  this.setState = (nextState = []) => {
    this.state = nextState;
    docsList.setState(this.state);
    this.render();
  }

  this.render = () => {
    $target.insertBefore($page, $target.firstChild);
  }

  const fetchDocsList = async () => {
    const nextState = await request('/documents', {
      method : 'GET'
    });

    this.setState(nextState)
  }

  fetchDocsList();
}