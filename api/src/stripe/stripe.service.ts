import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';
import { Cart } from './Cart.module';
@Injectable()
export class StripeService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  checkOut(cart: Cart) {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, //convert price to cents
      currency: 'usd', //currency type,
      payment_method_types: ['card'], //payment_method
    });
  }
}
