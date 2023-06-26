import { MatDialog } from '@angular/material/dialog';
import { Product } from './../../shared/models/product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  tap,
} from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductDetailComponent } from '../detail/product-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  datasource = new MatTableDataSource<Product>([]);
  displayedColumns = [
    'code',
    'name',
    'price',
    'stock',
    'uomCode',
    'categoryCode',
    'actions',
  ];

  searchControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly productSvc: ProductService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap((value) => {
          this.reloadTable(value);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  openDialog(product?: Product) {
    this.dialog
      .open(ProductDetailComponent, {
        width: '50%',
        hasBackdrop: true,
        data: {
          product,
        },
      })
      .afterClosed()
      .pipe(
        tap((result) => {
          if (!result) {
            return;
          }
          this.reloadTable();
        })
      )
      .subscribe();
  }

  remove(product: Product) {
    if (!confirm('¿Está seguro de eliminar?')) {
      return;
    }

    this.productSvc
      .delete(product.code)
      .pipe(
        tap(() => {
          this.snackBar.open('Se eliminó correctamente.', 'Ok', {
            horizontalPosition: 'end',
          });
          this.reloadTable();
        }),
        catchError((xhr) => {
          console.error(xhr);
          this.snackBar.open('Hubo un error al momento de eliminar.', 'Ok', {
            horizontalPosition: 'end',
          });
          return of(null);
        })
      )
      .subscribe();
  }

  private reloadTable(search?: string) {
    this.productSvc
      .list(search)
      .pipe(tap((results) => (this.datasource.data = results)))
      .subscribe();
  }
}
