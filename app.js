const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// open and close Cart
cartIcon.onclick = ()=>{
    cart.classList.add("active");
};
closeCart.onclick = ()=>{
    cart.classList.remove("active");
};
//----------------------
if(document.readyState=="loading"){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    const  deleteFromCartButtons = document.querySelectorAll(".cart-remove");
    for(var i = 0; i < deleteFromCartButtons.length; i++){
        const button = deleteFromCartButtons[i];
        button.addEventListener("click",removeProductFromCart);
    }

    const quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityInputs.length; i++){
        const input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }

    const addProductToCartButtons=document.getElementsByClassName("add-cart");
    for(var i = 0; i < addProductToCartButtons.length; i++){
        const button = addProductToCartButtons[i];
        button.addEventListener("click",addToCartBtnClicked);
    }
}
function quantityChanged(e){
    const input = e.target;
    if(isNaN(input.value)|| input.value<=0){
        input.value = 1;
        updateTotal();
    }else{
    updateTotal();
    }
}


// Click to add product to cart
function addToCartBtnClicked(e){
    const button = e.target
    const shopProducts = button.parentElement
    const title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    const price = shopProducts.getElementsByClassName("price")[0].innerText;
    const Img = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,Img);
    updateTotal();
    cart.classList.add("active");

}
// Add product to cart
function addProductToCart(title, price, Img){
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    const cartItems =document.getElementsByClassName("cart-content")[0];
    const cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText==title){
            alert("You have already add this item to cart");
            return;
        }       
    }
var cartBoxContent = '  <img src="'+Img+'"class="cart-img"> <div class="detail-box">  <div class="cart-product-title">'+title+'</div> <div class="cart-price">'+price+'</div> <input type="number" value="1" class="cart-quantity"> </div> <img src="img/trash.svg" alt="" class="cart-remove" width="20px">';
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeProductFromCart);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);
}
//remove item from cart
function removeProductFromCart(event){
    const buttonClidked = event.target
    buttonClidked.parentElement.remove();
    updateTotal();
}
document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);

function buyButtonClicked(){
    const cartContent = document.getElementsByClassName("cart-content")[0];
    if(!cartContent.hasChildNodes()){
        alert('Your cart is empty');
        return;
    }
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);

    }
    updateTotal();
}
// update total price
function updateTotal(){
    const cartContent = document.getElementsByClassName("cart-content")[0];
    const cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total =0;
    for(var i = 0 ; i < cartBoxes.length ; i++){
        var cartBox = cartBoxes[i];
        const priceElement = cartBox.getElementsByClassName("cart-price")[0];
        const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price =parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total=total+price*quantity; 
        total=Math.round(total*100)/100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
}