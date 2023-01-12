let maxPage;
let page = 1;
let infiniteScroll;
searchFormBtn.addEventListener('click',()=>{
    location.hash="#search=" + searchFormInput.value;
});
trendingBtn.addEventListener('click',()=>{
    location.hash="#trends="
})
arrowBtn.addEventListener('click',()=>{
  history.back();
    // location.hash='#home'
})
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener('scroll',infiniteScroll,false);


function navigator() {
  console.log({ location });
  if(infiniteScroll){
    window.removeEventListener('scroll',infiniteScroll,{passive:false});
    infiniteScroll=undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviesDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  document.body.scrollTop=0;
  document.documentElement.scrollTop=0;
  if(infiniteScroll){
    window.addEventListener('scroll',infiniteScroll,{passive:false});
  }

}

function homePage() {
  console.log("Home!!");
  headerSection.classList.remove('header-container--long');
  headerSection.style.background="";
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  likedMoviesSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
}

function categoriesPage() {
  console.log("Categories!");
  headerSection.classList.remove('header-container--long');
  headerSection.style.background="";
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  const [_,categoryData]=location.hash.split('='); //['#category,'id-name']
  const [categoryId,categoryName]=categoryData.split('-');
  headerCategoryTitle.innerText=decodeURI(categoryName);

  getMoviesByCategory(categoryId);
  infiniteScroll=getPaginatedMoviesByCategory(categoryId);
}

function moviesDetailsPage() {
  console.log("Movie!!");
  headerSection.classList.add('header-container--long');
//   headerSection.style.background="";
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  const [_,movieId]=location.hash.split('='); //['#movie,'131234']
  getMovieById(movieId);

}

function searchPage() {
  console.log("search!");
  headerSection.classList.remove('header-container--long');
  headerSection.style.background="";
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  const [_,query]=location.hash.split('='); //['#search,'buscador']
  getMoviesBySearch(query);
  infiniteScroll=getPaginatedMoviesBySearch(query);
}

function trendsPage() {
  console.log("Trends!!");
  headerSection.classList.remove('header-container--long');
  headerSection.style.background="";
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  headerCategoryTitle.innerText='Tendencias';
  getTrendingMovies();
  infiniteScroll=getPaginatedTrendingMovies;
}


