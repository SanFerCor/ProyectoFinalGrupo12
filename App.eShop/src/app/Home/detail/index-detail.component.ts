import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { Product } from "../../shared/models/product.model";
import { ProductService } from "../../shared/services/product.service";


@Component({
  templateUrl: './index-detail.component.html',
  styleUrls: ['./index-detail.component.scss']
})
export class IndexDetailComponent implements OnInit {
  products: Product[];

  constructor(private readonly productSvc: ProductService) {

  }

  ngOnInit(): void {
    this.productSvc.list().pipe(tap((products) => {
      this.products = products;
    })).subscribe();
  }

}
