
// making Cards and declaring values inside card
const productContainer = document.querySelector(".product-container");

const cardContainers = () =>{
    for(let i = 0; i < 30; i++){
        productContainer.innerHTML += `<div class="productCard">
        <div class="card-img">
            <img src="" alt="">
        </div>
        <h4 class="card-title"></h4>
        <p class="card-category"></p>
        <p class="card-price"></p>
        <p class="card-rating"><span class="rating-star">★</span> </p>
        <button class="add-cart-btn">Add to Cart</button>
    </div>`;
    }
};
cardContainers();

// placing Items / details in Cards
const cards = document.querySelectorAll(".productCard");
const cardImg = document.querySelectorAll(".card-img");
const cardTitle = document.querySelectorAll(".card-title");
const cardCategory = document.querySelectorAll(".card-category");
const cardRating = document.querySelectorAll(".card-rating");

const fetchingData = async()=>{
    const apiFetch = await fetch("https://dummyjson.com/products");

    const jsonData = await apiFetch.json();

    const productData = jsonData.products;

    // console.log(productData);


    for(let i=0; i<30; i++){
        cardImg[i].innerHTML   =  `<img src="${productData[i].thumbnail}" alt="pro[i].title">`;
        cardTitle[i].innerHTML = `${productData[i].title}`;
        cardCategory[i].innerHTML = `${productData[i].category}`;
        cardRating[i].innerHTML = `<span class="rating-star">★</span>${productData[i].rating}`;
    }
}
fetchingData();

// Adding items in Cart
const cartValue = document.querySelector(".cartValue");
const cartBtn = document.querySelectorAll(".add-cart-btn");

const addInCart = ()=>{
    let initialCartValue = 0;
    

    
}
 



