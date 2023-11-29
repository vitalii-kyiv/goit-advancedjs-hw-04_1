(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const l=document.querySelector(".search-form"),i=document.querySelector(".load-more"),c=document.querySelector(".gallery");i.hidden=!0;let m=1;function u(s,o=1){const r=new URLSearchParams({key:"37994120-fff0e4792a0f4f4675b43ad43",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:3,page:o});return axios(`https://pixabay.com/api/?${r}`)}l.addEventListener("submit",h);i.addEventListener("click",p);function h(s){s.preventDefault();const o=l.elements.searchQuery.value;console.log(o),u(o).then(r=>{i.hidden=!1;const a=r.data.hits;console.log(r.data),console.log(a),a.length?(c.innerHTML=d(a),iziToast.success({closeOnEscape:!0,closeOnClick:!0,messageSize:"16",maxWidth:500,position:"topRight",message:`Hooray! We found ${r.data.total} images.`})):(iziToast.error({closeOnEscape:!0,closeOnClick:!0,backgroundColor:"tomato",messageColor:"white",position:"topRight",messageSize:"16",maxWidth:500,message:"Sorry, there are no images matching your search query. Please try again."}),c.innerHTML="")})}function d(s){return s.map(({webformatURL:o,largeImageURL:r,tags:a,likes:e,views:t,comments:n,downloads:f})=>`
        <div class="photo-card">
        <a href="${r}">
          <img src="${o}" alt="${a}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes ${e}</b>
            </p>
            <p class="info-item">
              <b>Views ${t}</b>
            </p>
            <p class="info-item">
              <b>Comments ${n}</b>
            </p>
            <p class="info-item">
              <b>Downloads ${f}</b>
            </p>
          </div>
        </div>
      `).join("")}function p(){const s=l.elements.searchQuery.value;u(s,m+1).then(o=>{const r=o.data.hits;if(!r.length){iziToast.error({closeOnEscape:!0,closeOnClick:!0,backgroundColor:"tomato",messageColor:"white",position:"topRight",messageSize:"16",maxWidth:500,message:"We're sorry, but you've reached the end of search results."}),i.hidden=!0;return}c.insertAdjacentHTML("beforeend",d(r))})}
//# sourceMappingURL=commonHelpers.js.map
