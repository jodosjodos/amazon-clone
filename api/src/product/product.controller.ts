import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';
import { JwtGuard } from 'src/guard/jwt.guard';

// product Controller
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @Post()
  createPost(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.service.create(name, price, description);
  }
  // get single product
  @UseGuards(JwtGuard)
  @Get(':id')
  getProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.service.find(id);
  }

  // get all products
  @Get()
  findAllProducts(): Promise<ProductDocument[]> {
    return this.service.findAll();
  }

  // update product
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('price') price?: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.service.update(id, name, price, description);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
