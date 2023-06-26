import { MatDialog } from '@angular/material/dialog';
import { Product } from './../../shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductDetailComponent } from '../detail/product-detail.component';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  datasource = new MatTableDataSource<Product>([]);
  displayedColumns = ['code', 'name', 'price', 'stock', 'uomCode'];

  constructor(
    private readonly productSvc: ProductService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productSvc
      .list()
      .pipe(tap((results) => (this.datasource.data = results)))
      .subscribe();
  }

  openDialog() {
    this.dialog.open(ProductDetailComponent, {
      width: '50%',
      hasBackdrop: true,
    });
  }
}
