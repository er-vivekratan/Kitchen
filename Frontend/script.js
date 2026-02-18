let cart = JSON.parse(localStorage.getItem("cart")) || [];
let lang="en";

function addToCart(name, price){
cart.push({name,price});
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

function loadCart(){
let list=document.getElementById("cartItems");
let total=0;
cart.forEach(i=>{
let li=document.createElement("li");
li.textContent=i.name+" ₹"+i.price;
list.appendChild(li);
total+=i.price;
});
document.getElementById("total").textContent="Total: ₹"+total;
}

if(document.getElementById("cartItems")) loadCart();

function checkoutWhatsApp(){
let msg="Order from Mumma’s Kitchen:\n";
cart.forEach(i=>msg+=`${i.name} ₹${i.price}\n`);
window.open("https://wa.me/91XXXXXXXXXX?text="+encodeURIComponent(msg));
}

function searchItems(){
let input=document.querySelector("input").value.toLowerCase();
document.querySelectorAll(".item").forEach(el=>{
el.style.display=el.innerText.toLowerCase().includes(input)?"block":"none";
});
}

function toggleLang(){
lang = lang==="en"?"hi":"en";
document.querySelectorAll("[data-en]").forEach(el=>{
el.innerText = el.dataset[lang];
});
}
