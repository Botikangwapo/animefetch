let listanime = []
let currentanimelist = 0

function renderAnimeLists(data) {
    const listahan = document.getElementById('list');
    const vidcontainer = document.getElementById('videos');
    const videothir = document.getElementById('videothir');

    listahan.innerHTML = '';
    vidcontainer.innerHTML = '';
    videothir.innerHTML = '';

    data.forEach((anime) => {
        listahan.innerHTML += createListHTML(anime);

        vidcontainer.innerHTML += `
            <div class="vid-body">
                <div class="vidimg">
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="vidcontent">
                    <h4 style="color:white; font-size: 0.9rem;">${anime.title}</h4>
                    <p style="color:rgb(255, 204, 50); font-size: 0.8rem;">Score: ${anime.score}</p>
                </div>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg></span>
            </div>
        `;

        videothir.innerHTML += `
            <div class="thir-body">
                <div class="tirvidimg">
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="thirvicon">
                    <h4 style="color:white; font-size: 0.9rem;">${anime.title}</h4>
                    <p style="color:rgb(255, 204, 50); font-size: 0.8rem;">Score: ${anime.score}</p>
                </div>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg></span>
            </div>
        `;
    });
}

function renderOnlyList(data) {
    const listahan = document.getElementById('list');
    listahan.innerHTML = '';
    data.forEach(anime => {
        listahan.innerHTML += createListHTML(anime);
    });
}

function createListHTML(anime) {
    return `
        <div class="list">
            <li>
                <img src="${anime.images.jpg.image_url}" alt="">
                <div class="listcontent">
                    <h1>${anime.title}</h1>
                    <p>${anime.score}</p>
                </div>
            </li>
        </div>
    `;
}

async function getalldataanime() {
    const animeurl = 'https://api.jikan.moe/v4/top/anime'
    try {
        const response = await fetch(animeurl)
        const result = await response.json()
        listanime = result.data;

        renderAnimeLists(listanime);
        displayanime(currentanimelist)

        document.getElementById('list').style.display = 'none';

    } catch (error) {
        console.error(error)
    }
}

function displayanime(index) {
    if (listanime.length === 0) return;
    const animechar = listanime[index];
    const bgContainer = document.getElementById('section-con');
    const imageUrl = animechar.images.jpg.large_image_url;
    const imgPreloader = new Image();
    imgPreloader.src = imageUrl;
    bgContainer.classList.add('loading-blur');
    imgPreloader.onload = () => {
        document.getElementById('title').innerText = animechar.title;
        document.getElementById('para').innerText = animechar.synopsis ? animechar.synopsis.slice(0, 300) + "..." : "No description available.";
        bgContainer.style.backgroundImage = `linear-gradient(to left, rgba(0, 0, 0, 0.29), rgba(0, 0, 0, 0.9)), url('${imageUrl}')`;
        setTimeout(() => {
            bgContainer.classList.remove('loading-blur');
        }, 300);
        const content = document.querySelector('.content');
        content.style.animation = 'none';
        content.offsetHeight;
        content.style.animation = 'fadeup 0.5s ease-out forwards';
    };
}

const searchInput = document.getElementById('search')

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const listahan = document.getElementById('list');

    if (value.trim() === "") {
        listahan.style.display = 'none';
        return;
    }

    const filtered = listanime.filter(anime =>
        anime.title.toLowerCase().includes(value) ||
        (anime.score && anime.score.toString().includes(value))
    );

    renderOnlyList(filtered);
    listahan.style.display = 'flex';
});

const next = document.getElementById('next')
const previous = document.getElementById('Previous')
const opens = document.getElementById('open')
const asides = document.querySelector('.aside')
const show = document.querySelector('.show')
const eme = document.querySelector('.eme')
const remove = document.querySelector('.remove')
const body = document.body;
const html = document.documentElement;

next.addEventListener('click', () => {
    currentanimelist++;
    if (currentanimelist >= listanime.length) {
        currentanimelist = 0;
    }
    displayanime(currentanimelist);
});

previous.addEventListener('click', () => {
    currentanimelist--;
    if (currentanimelist < 0) {
        currentanimelist = listanime.length - 1;
    }
    displayanime(currentanimelist);
});

opens.addEventListener("click", () => {
    asides.classList.toggle("active")
    body.classList.toggle("no-scroll")
    html.classList.toggle("no-scroll")
})

show.addEventListener("click", () => {
    eme.classList.add("shows")
})

remove.addEventListener("click", () => {
    eme.classList.remove("shows")
})

getalldataanime();