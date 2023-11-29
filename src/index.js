const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const searchResultGallery = document.querySelector('.gallery');
loadMoreBtn.hidden = true;

let page = 1;
function serviceSearch(searchText, page = 1) {
  const params = new URLSearchParams({
    key: '37994120-fff0e4792a0f4f4675b43ad43',
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 3,
    page,
  });
  return axios(`https://pixabay.com/api/?${params}`);
}

form.addEventListener('submit', onSubmitClick);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  const searchData = form.elements['searchQuery'].value;
  console.log(searchData);
  serviceSearch(searchData).then(response => {
    loadMoreBtn.hidden = false;
    const data = response.data.hits;
    console.log(response.data);
    console.log(data);
    if (!data.length) {
      iziToast.error({
        closeOnEscape: true,
        closeOnClick: true,
        backgroundColor: 'tomato',
        messageColor: 'white',
        position: 'topRight',
        messageSize: '16',
        maxWidth: 500,
        message: `Sorry, there are no images matching your search query. Please try again.`,
      });
      searchResultGallery.innerHTML = '';
    } else {
      searchResultGallery.innerHTML = renderSearchResult(data);
      iziToast.success({
        closeOnEscape: true,
        closeOnClick: true,
        messageSize: '16',
        maxWidth: 500,
        position: 'topRight',
        message: `Hooray! We found ${response.data.total} images.`,
      });
    }
  });
}

function renderSearchResult(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
              <b>Views ${views}</b>
            </p>
            <p class="info-item">
              <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads ${downloads}</b>
            </p>
          </div>
        </div>
      `
    )
    .join('');
}

function onLoadMoreBtnClick() {
  const searchData = form.elements['searchQuery'].value;
  serviceSearch(searchData, page + 1).then(response => {
    const data = response.data.hits;
    if (!data.length) {
      iziToast.error({
        closeOnEscape: true,
        closeOnClick: true,
        backgroundColor: 'tomato',
        messageColor: 'white',
        position: 'topRight',
        messageSize: '16',
        maxWidth: 500,
        message: `We're sorry, but you've reached the end of search results.`,
      });
      loadMoreBtn.hidden = true;
      return;
    }
    searchResultGallery.insertAdjacentHTML(
      'beforeend',
      renderSearchResult(data)
    );
  });
}
