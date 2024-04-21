import PRODUCTS_DATA from './products.js';
const PRODUCTS_JSON = JSON.parse(PRODUCTS_DATA);

let cartArr = [];
let tabRmm = "";

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const categoriesContainer = document.getElementById("categories-container");

const categorySearchInput = document.getElementById("searchInputCategory")
categorySearchInput.addEventListener("input", searchCategory);

function searchCategory() {
    const searchTerm = categorySearchInput.value.toLowerCase();

    const shownProducts = document.querySelectorAll('.product-info');
    
    shownProducts.forEach((product) => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        const displayStyle = productName.includes(searchTerm) ? 'block' : 'none';

        product.style.display = displayStyle;
        
    });
}

const searchInput = document.getElementById("searchInput")
searchInput.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {

            categoriesContainer.getContext
            const searchTerm = searchInput.value.toLowerCase();
            
            const filteredProducts = PRODUCTS_JSON.filter((product) => {
                return product.name.toLowerCase().includes(searchTerm);
            });
            console.log(filteredProducts);
            deleteChildElements(categoriesContainer);
            addProductsToPage(filteredProducts, categoriesContainer);
            
            if (searchTerm === "" && tabRmm != "") {
                subCategorize(tabRmm);
            }  else if (searchTerm === "") {
                showFeatured();
            }     

        }
    });

function addProductsToPage(products, container) {
    if (container) {    
        products.forEach((product) => {

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info'); 
            const template = `
                <p><img src ="${product.image}" class="product-img"></img></p>
                <h3 class="product-name">${product.name}</h3>
                <p>$${product.price}</p>
                <button class="addToCartBtn" id="product${product.id}Btn">Add to Cart</button>
                `;
            productInfo.innerHTML = template;

            const addToCartButton = productInfo.querySelector('.addToCartBtn');
            addToCartButton.addEventListener("click", () => addToCart(product.id));

            container.appendChild(productInfo);
        });
    }
    searchCategory();
}

//ALL FILTERS

const featuredProducts = PRODUCTS_JSON.filter((product) => {
    return product.tag.includes("featured");
})

const groceriesProducts = PRODUCTS_JSON.filter((product) => {
    return product.tag.includes("groceries");
})

const apparelProducts = PRODUCTS_JSON.filter((product) => {
    return product.tag.includes("apparel");
})

const furnitureProducts = PRODUCTS_JSON.filter((product) => {
    return product.tag.includes("furniture");
})

const techProducts = PRODUCTS_JSON.filter((product) => {
    return product.tag.includes("tech");
})

addProductsToPage(featuredProducts, categoriesContainer);

// SUBCATEGORIZE FUNCTION

function subCategorize (PRODUCTS_JSON) {
    deleteChildElements(categoriesContainer);
    const uniqueSubtags = new Set();

    PRODUCTS_JSON.forEach((product) => {
        product.subtag.forEach((tag)=> {
            if (tag != "") {
                uniqueSubtags.add(tag);
            }
        });
    });

    uniqueSubtags.forEach((subtag) => {
        const subtagContainer = document.createElement('div');
        subtagContainer.classList.add('subtag-container');
        const categoriesHeader = document.createElement('div');
        categoriesHeader.classList.add('categories-header'); 
        const template = `
        <h2>${subtag.toUpperCase()}</h2>    
        `;
        categoriesHeader.innerHTML = template;

        categoriesContainer.appendChild(categoriesHeader);

        const showProducts = PRODUCTS_JSON.filter((product) => {
            return product.subtag.includes(subtag);
        })

        addProductsToPage(showProducts, subtagContainer);
        categoriesContainer.appendChild(subtagContainer);
    });
    searchCategory();
    tabRmm = PRODUCTS_JSON;
}

// SHOW PRODUCTS FUNCTIONS

function showFeatured () {
    deleteChildElements(categoriesContainer);
    addProductsToPage(featuredProducts, categoriesContainer);
    tabRmm = "";
}

function showGroceries () {
    subCategorize (groceriesProducts);
}

function showApparel () {
    subCategorize(apparelProducts);
}

function showFurniture () {
    subCategorize(furnitureProducts);
}

function showTech () {
    subCategorize(techProducts);
}

function showContact () {
    deleteChildElements(categoriesContainer);
}

function showCart () {
    deleteChildElements(categoriesContainer);

    cartArr.forEach((productid) => {
        const cartProducts = PRODUCTS_JSON.filter((product) => {
            return product.id == productid;
        });
        cartProducts.forEach((product) => {

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info'); 
            const template = `
                <p><img src ="${product.image}" class="product-img"></img></p>
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="removeFromCartBtn" id="remove-product${product.id}Btn">Remove</button>
                `;
            productInfo.innerHTML = template;

            const removeFromCartButton = productInfo.querySelector('.removeFromCartBtn');
            removeFromCartButton.addEventListener("click", () => removeFromCart(product.id));

            categoriesContainer.appendChild(productInfo);
        });
    });

}

function addToCart(productid) {
    cartArr.push(productid);
    console.log(cartArr);
}

function removeFromCart(productid) {
    const index = cartArr.indexOf(productid);
    cartArr.splice(index, 1);
    console.log(cartArr);
    showCart();
}

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// BUTTON EVENT LISTENERS

document.getElementById("featuredBtn").addEventListener("click", showFeatured);
document.getElementById("groceriesBtn").addEventListener("click", showGroceries);
document.getElementById("apparelBtn").addEventListener("click", showApparel);
document.getElementById("furnitureBtn").addEventListener("click", showFurniture);
document.getElementById("techBtn").addEventListener("click", showTech);
document.getElementById("contactBtn1").addEventListener("click", showContact);
document.getElementById("cartBtn1").addEventListener("click", showCart);
document.getElementById("contactBtn2").addEventListener("click", showContact);
document.getElementById("cartBtn2").addEventListener("click", showCart);
document.getElementById("toTopBtn").addEventListener("click", toTop);
