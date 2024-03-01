const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container')
const errorContent = document.getElementById('error-content')

let selectCategory = 1000;

const loadItems = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json()
    const dataGet = data.data
    displayItem(dataGet)
}

const displayItem = (allData) => {
    allData.forEach(data => {
        // console.log(data)
        const button = document.createElement('button');
        button.classList = `btn btn-ghost bg-slate-600 text-white`
        button.innerText = data.category;
        button.addEventListener('click', () => fetchDataGet(data.category_id))
        btnContainer.appendChild(button)
    })
};

const fetchDataGet = async (elementId) => {
    selectCategory = elementId
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${elementId}`);
    const data = await res.json()
    const getData = data.data
    // content check here
    if(getData.length === 0){
        errorContent.classList.remove('hidden');
    }else{
        errorContent.classList.add('hidden');
    }
    cardContainer.innerHTML = '';
    getData.forEach(video => {
        // badge verify check
        let verifyBadge = '';
        if (video.authors[0].verified){
            verifyBadge = `<img src="Group 3.svg" alt="png">`
        }
        else{
            verifyBadge = ''
        }

        console.log(video);
        const newCard = document.createElement('div');
        newCard.innerHTML = `
             <div class="card bg-base-100 rounded">
                <figure><img class="h-44 w-80" src="${video.thumbnail}" alt="Shoes" />
                </figure>
                <p
                    class="absolute top-[136px] text-[12px] font-normal bg-[#171717] text-[#FFFFFF] p-1 rounded-md left-48">
                    12.40 second
                </p>
                <div class="mt-4">
                    <div class="flex gap-2 pe-3 items-center">
                        <img class="w-10 h-10 rounded-full" src="${video.authors.map(x => x.profile_picture)}" alt="photo">
                        <p class="text-sm font-bold">${video.title}</p>
                    </div>
                    <div class="flex gap-2 mt-1 ps-12">
                        <p class="text-sm font-normal text-[#171717B3]">${video.authors.map(x => x.profile_name)}</p>
                        ${verifyBadge}
                    </div>
                    <p class="mt-2 text-[#171717B3] text-sm font-medium ps-12">${video.others.views}</p>
                </div>
            </div>
        `

        cardContainer.appendChild(newCard);

    });
}

loadItems()
fetchDataGet(selectCategory)