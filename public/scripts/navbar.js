let itemLink = document.getElementById("item-list");
itemLink.addEventListener("click",() => { 
    const itemList= localStorage.getItem("itemList") ;
    const itemListObj = itemList ? mapToJson(itemList): "{}";
    document.location.href = `/itemList/${itemListObj}`
});

let ordersLink= document.getElementById("orders-link");
ordersLink.addEventListener("click",() => { 
    document.location.href = `/orders`
});

let adminLink = document.getElementById("admin-link");
if (adminLink) {
  adminLink.addEventListener("click", () => {
    document.location.href = "/admin";
  });
}

let chefLink = document.getElementById("chef-link");
if (chefLink) {
  chefLink.addEventListener("click", () => {
    document.location.href = "/chef";
  });
}