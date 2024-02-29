const btnContainer = document.getElementById('btn-container');

const loadItems = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json()
    const dataGet = data.data
    displayItem(dataGet)
}

const displayItem = (allData) => {
    allData.forEach(data => {
        console.log(data)
        const button = document.createElement('button')
        button.innerText = data.category
        btnContainer.appendChild(button)
    })
};

loadItems()