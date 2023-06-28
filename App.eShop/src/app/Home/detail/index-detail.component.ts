import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import * as _ from 'lodash';

@Component({
  templateUrl: './index-detail.component.html',
  styleUrls: ['./index-detail.component.scss'],
})
export class IndexDetailComponent implements OnInit {
  products: Product[];

  searchControl = new FormControl('');

  basket: { product: Product; quantity: number; price: number }[] = [];

  get totalAmount() {
    return _.sumBy(this.basket, (x) => x.price);
  }

  constructor(private readonly productSvc: ProductService) {}

  ngOnInit(): void {
    this.productSvc
      .list()
      .pipe(
        tap((products) => {
          this.products = products;
        })
      )
      .subscribe();

    this.searchControl.valueChanges
      .pipe(
        tap((value) => {
          this.productSvc
            .list(value)
            .pipe(
              tap((products) => {
                this.products = products;
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  addProduct(product: Product) {
    const item = this.basket.find((x) => x.product.code === product.code);

    if (item) {
      item.quantity += 1;
      item.price = item.quantity * item.product.price;
    } else {
      this.basket.push({ product, price: product.price, quantity: 1 });
    }
  }

  removeProduct(item: (typeof this.basket)[0]) {
    _.remove(this.basket, (x) => x.product.code === item.product.code);
  }
}
