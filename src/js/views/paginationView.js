import view from './view';
import icons from 'url:../../img/icons.svg';
// const prev_btn = document.querySelector('.pagination__btn--prev');
// const next_btn = document.querySelector('.pagination__btn--next');

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const current_page = +this._data.page;
    // we r on pg1 and there r other pages
    if (current_page === 1 && numPages > 1) {
      return `<button data-goto="${
        current_page + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${current_page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // Last page
    if (current_page === numPages && numPages > 1) {
      return `<button data-goto="${
        current_page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${current_page - 1}</span>
    </button>`;
    }

    // other page
    if (current_page < numPages) {
      return `<button data-goto="${
        current_page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${current_page - 1}</span>
    </button>
    <button data-goto="${
      current_page + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${current_page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // we r on pg 1 and no other pages
    return ``;
  }
}

export default new paginationView();
