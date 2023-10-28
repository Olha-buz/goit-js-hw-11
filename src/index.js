import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './fetchImages';
import { markUpGallery } from './markUpGallery';


const body = document.querySelector('body');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadmore = document.querySelector('.load-more');


form.addEventListener('submit', onSearchForm);

let query = '';
let page = 1;
let simplelightbox;
const per_page = 40;

function onSearchForm(evt) {
    evt.preventDefault();
    query = evt.target.elements.searchQuery.value.trim();
    gallery.innerHTML = '';

    if (query === '') {
        Notiflix.Notify.failure('Please enter a search keyword!');
        return;
    };
    
    fetchImages(query, page, per_page)
        .then(data => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                markUpGallery(data.hits);
                simplelightbox = new SimpleLightbox('.gallery a').refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
            }
        })
        .catch(error => console.log(error))
        .finally(_ => form.reset());
}

