import { Body, Controller, Post } from '@nestjs/common';
import { Cart } from './Cart.module';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly service: StripeService) {}
  @Post()
  checkout(@Body() body: { cart: Cart }) {
    try {
      return this.service.checkOut(body.cart);
    } catch (error) {
      return error;
    }
  }
}
