import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products, getProduct} from '../data/products.js';
import {deliveryOptions, getDeliveryOption} from '../data/deliveryOptions.js';
import {formatCurrency} from './utils/money.js';
import { addOrder } from '../data/orders.js';


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

  });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div class = "js-payment-items"></div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order ">
        Place your order
      </button>
    `
    
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    function updateCartQuantity() {

      let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  document.querySelector('.js-payment-items')
    .innerHTML = `Items (${cartQuantity}):`;
  }
  updateCartQuantity();

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    const response = await fetch('https://supersimplebackend.dev/orders',  {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });
    const order = await response.json();
    addOrder(order);
    window.location.href = 'orders.html';
  });
}
