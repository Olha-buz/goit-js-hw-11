import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './fetchImages';
import { renderGallery } from './renderGallery';


const body = document.querySelector('body');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadmore = document.querySelector('.load-more');


form.addEventListener('submit', onSearchForm);

let query = '';
let page = 1;
let simplelightbox;
const per_page = 40;

async function onSearchForm(evt) {
    evt.preventDefault();
    query = evt.target.elements.searchQuery.value.trim();
    gallery.innerHTML = '';

    if (query === '') {
        Notiflix.Notify.failure('Please enter a search keyword!');
        return;
    };
    try {
        const images = await fetchImages(query);
        console.log(images.totalHits); //Вся кількість знайдених фото

        if (images.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            renderGallery(images.hits);
            simplelightbox = new SimpleLightbox('.gallery a').refresh();
            Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`)
        }
    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
    } finally {
        form.reset();
    }
}
