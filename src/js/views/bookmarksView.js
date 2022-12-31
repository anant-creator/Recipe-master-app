import view from './view.js';
import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView';

class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new BookmarksView();
