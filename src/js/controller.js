import recipeView from './views/recipeView.js';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SearchView from './views/searchView';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 0) update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // updatingBookmarksView
    bookmarksView.update(model.state.bookmarks);

    //Loading recipe
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // get search query

    const query = SearchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    // load search results
    await model.loadSearchResults(query);

    // render results
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination buttons
    // console.log(model.state);
    // paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const controlPagination = function (goToPage) {
  pageId = goToPage;
  resultsView.render(model.getSearchResultsPage(pageId));

  paginationView.render(model.state.search);
};

const controlServings = function (newVal) {
  model.updateServings(newVal);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServingUpdate(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  SearchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

function clearBookmarks() {
  localStorage.clear('bookmarks');
}
