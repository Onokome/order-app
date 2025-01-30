import { menuArray } from "./data.js";
const mainMenu = document.getElementById('main-menu')
const order = []
const orderContainer = document.getElementById('order-container')


mainMenu.innerHTML = menuArray.map(function(item){
return ` 
<div class="menu-item">
            <div class="box">
              <div class=first-sect>
                 <h3>${item.emoji}</h3> 
                 <div id="details">
                    <h4>${item.name}</h4>
                    <p>${item.ingredients}</p>
                    <h5>$${item.price}</h5>
                  </div> 
              </div>
              <button data-add="${item.id}">+</button>
            </div>
    </div>
`
}).join('')

document.addEventListener('click', function(e){
if (e.target.dataset.add){
  handleOrderItem(e.target.dataset.add)
}
if (e.target.dataset.remove){
  handleRemoveItem(e.target.dataset.remove)
}

if (e.target.id === 'complete-order-btn'){
  document.getElementById('modal-container').style.display = 'block'
  document.body.style.overflow = 'hidden'
}

if(e.target.id === 'close-modal-btn'){
  document.getElementById('modal-container').style.display = 'none'
}

if (e.target.id === 'pay-btn'){
  console.log("Pay button clicked!")
  document.getElementById('modal-container').style.display = 'none'
  orderContainer.innerHTML = " "
}

})

function handleOrderItem(orderId){
const orderItem = menuArray.filter(function(menuItem){
return menuItem.id === parseInt(orderId)
})[0]

if (orderItem){
  const itemExists = order.some(function(item){
    return item.id === orderItem.id
  })

  if (!itemExists){
    order.push(orderItem)
    renderOrder()
  } else{
    alert('This item is already in your order.')
  }
}

}

function handleRemoveItem(orderId){
   const index = order.findIndex((item) => {
    return item.id === parseInt(orderId)
   })

   if (index !== -1){
    order.splice(index, 1)
    renderOrder()
   }
}


function renderOrder(){

  if (order.length === 0) {
    orderContainer.innerHTML = " "
    return;
  } 

   let orderHtml = `<h4>Your Order</h4>`
    orderHtml += order.map(function(item) {
      return `
      <div class="order-box">
         <span>
         <p>${item.name}</p>
         <button id="remove" data-remove="${item.id}">remove</button>
         </span> 
         <p>$${item.price}</p>
      </div>
      `
    }).join('') 
  
  
  const totalPrice =  order.reduce(function(item, currentItem){
    return item + currentItem.price}, 0)

    orderHtml += `
    <div id="total" class="total-price">
      <span class="total"> 
      <p>Total price: </p>
      <p>$${totalPrice.toFixed(2)}</p>
      </span>
    </div>
    <button id="complete-order-btn" class="complete-order-btn"> Complete your Order</button>
    `   
  orderContainer.innerHTML = orderHtml
}


document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault()
})