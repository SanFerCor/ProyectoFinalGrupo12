import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { tap } from "rxjs";
import { Product } from "../../shared/models/product.model";
import { ProductService } from "../../shared/services/product.service";


@Component({
  templateUrl: './index-detail.component.html',
  styleUrls: ['./index-detail.component.scss']
})
export class IndexDetailComponent implements OnInit {
  products: Product[];
  searchControl = new FormControl("");

  constructor(private readonly productSvc: ProductService) {

  }

  ngOnInit(): void {
    this.productSvc.list().pipe(tap((products) => {
      this.products = products;
    })).subscribe();

    this.searchControl.valueChanges.pipe(
      tap((value) => {
        this.productSvc.list(value).pipe(tap((products) => {
          this.products = products;
        })).subscribe();
      })
    ).subscribe();
  }

}
