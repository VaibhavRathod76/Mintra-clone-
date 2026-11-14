const CONVENIENCE_FEE = 99;
globalThis.bagItems = globalThis.bagItems || [];
globalThis.bagItemObject = globalThis.bagItemObject || [];

onLoad();

function onLoad() {
  const bagItemsContainer = document.querySelector(".bag-items-container");
  const bagSummary = document.querySelector(".bag-summary");

  if (!bagItemsContainer || !bagSummary) {
    return;
  }

  loadBagItemObject();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagItemSummary = document.querySelector(".bag-summary");
  if (!bagItemSummary) {
    return;
  }

  let totalItem = globalThis.bagItemObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalAmount = 0;

  globalThis.bagItemObject.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  totalAmount += totalMRP + CONVENIENCE_FEE - totalDiscount;

  bagItemSummary.innerHTML = ` 
            <div class="bag-details-container">
                <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
                    <div class="price-item">
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">₹ ${totalMRP}</span>
                    </div>
                <div class="price-item">
                    <span class="price-item-tag">Discount on MRP</span>
                    <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
                </div>
                <div class="price-item">
                <span class="price-item-tag">Convenience Fee</span>
                <span class="price-item-value">₹ 99</span>
                </div>
                    <hr>
                <div class="price-footer">
                    <span class="price-item-tag">Total Amount</span>
                    <span class="price-item-value">₹ ${totalAmount}</span>
                </div>
            </div>
            <button class="btn-place-order">
                <div class="css-xjhrni">PLACE ORDER</div>
            </button>
    `;
}

function loadBagItemObject() {
  const bagItemsStr = localStorage.getItem("Items");
  globalThis.bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];

  globalThis.bagItemObject = globalThis.bagItems
    .map((itemId) => {
      for (let i = 0; i < items.length; i++) {
        if (itemId == items[i].id) {
          return items[i];
        }
      }
      return null;
    })
    .filter(Boolean);
}

function displayBagItems() {
  const bagItemsContainer = document.querySelector(".bag-items-container");
  if (!bagItemsContainer) {
    return;
  }

  let innerHTML = "";

  if (globalThis.bagItemObject.length > 0) {
    globalThis.bagItemObject.forEach((bagItem) => {
      innerHTML += generateItemHtml(bagItem);
    });
  } else {
    innerHTML = "<p>Your bag is empty.</p>";
  }

  bagItemsContainer.innerHTML = innerHTML;
}

function removeBagItem(itemId) {
  globalThis.bagItems = globalThis.bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("Items", JSON.stringify(globalThis.bagItems));
  loadBagItemObject();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHtml(item) {
  return `
        <div class="bag-item-container">
            <div class="item-left-part">
                <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
                <div class="company">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price-container">
                    <span class="current-price">₹ ${item.current_price}</span>
                    <span class="original-price">₹ ${item.original_price}</span>
                    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                </div>
                <div class="return-period">
                    <span class="return-period-days">${item.return_period} days</span> return available
                </div>
                <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">${item.delivary_date}</span>
                </div>
            </div>
            <div class="remove-from-cart" onclick="removeBagItem(${item.id})">X</div>
        </div>
    `;
}
