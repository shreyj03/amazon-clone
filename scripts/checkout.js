import {renderOrderSummary} from "./orderSummary.js";
import {renderPaymentSummary} from "./paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart, loadCartFetch} from '../data/cart.js';


async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();

    await loadCartFetch();


  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();


