globalThis.bagItems = globalThis.bagItems || [];
onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('Items');
    globalThis.bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayBagIcon();
    displayItemOnHomePage();
}

function addToBag(itemId) {
    globalThis.bagItems.push(itemId);
    localStorage.setItem('Items', JSON.stringify(globalThis.bagItems));
    displayBagIcon();
}

function displayBagIcon() {
    let itemsInBag = document.querySelector('.bag-item-count');
    if (!itemsInBag) {
        return;
    }

    if (globalThis.bagItems.length !== 0) {
        itemsInBag.innerHTML = globalThis.bagItems.length;
        itemsInBag.style.visibility = 'visible';
    } else {
        itemsInBag.style.visibility = 'hidden';
    }
}

function displayItemOnHomePage() {
    let itemContainerElement = document.querySelector(".items-container");
    if (!itemContainerElement) {
        return;
    }

    let product = "";
    items.forEach((item) => {
        product += `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="product img">
            <div class="rating">
                ${item.rating.stars ? item.rating.stars + ' ⭐' : 'No rating'} | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">₹ ${item.current_price}</span>
                <span class="original-price">₹ ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add To Bag</button>
        </div>
    `;
    });

    itemContainerElement.innerHTML = product;
}
