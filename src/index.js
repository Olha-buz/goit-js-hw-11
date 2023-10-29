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

// function onSearchForm(evt) {
//     evt.preventDefault();
//     query = evt.target.elements.searchQuery.value.trim();
//     gallery.innerHTML = '';

//     if (query === '') {
//         Notiflix.Notify.failure('Please enter a search keyword!');
//         return;
//     };
    
//     fetchImages(query, page, per_page)
//         .then(data => {
//             if (data.hits.length === 0) {
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//             } else {
//                 markUpGallery(data.hits);
//                 simplelightbox = new SimpleLightbox('.gallery a').refresh();
//                 Notiflix.Notify.success(`Hooray! We found ${data.hits.length} images.`)
//             }
//         })
//         .catch(error => console.log(error))
//         .finally(_ => form.reset());
// }

async function onSearchForm(evt) {
    evt.preventDefault();
    query = evt.target.elements.searchQuery.value.trim();
    gallery.innerHTML = '';

    if (query === '') {
        Notiflix.Notify.failure('Please enter a search keyword!');
        return;
    };
    try {
        const response = await fetchImages(query, page, per_page);
        console.log(response);
        const images = response.data.hits;
        console.log(images);
        const totalHits = response.data.totalHits;
        console.log(totalHits);

        if (images.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            markUpGallery(images);
            simplelightbox = new SimpleLightbox('.gallery a').refresh();
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
    } finally {
        form.reset();
    }
}
