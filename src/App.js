import DocsListPage from './DocsListPage.js';
import DocEditPage from './DocEditPage.js';
import { initRouter } from './router.js';


export default function App({ $target }) {
    const docsListPage = new DocsListPage({
        $target,
    });

    docsListPage.setState();
    
    const docEditPage = new DocEditPage({
        $target,
    });


    this.route = () => {
        const { pathname } = window.location;

        if (pathname.indexOf('/documents/') === 0) {
            const [, , id] = pathname.split('/');
            console.log('onRoute실행 후',id);
            docEditPage.setState({id, doc : {title : '', content : ''}})
        }
    };

    this.route();

    initRouter(() => this.route());
}
