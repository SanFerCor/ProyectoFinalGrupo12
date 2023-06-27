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
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoriesDetailComponent } from '../detail/categories-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit, OnDestroy {
  datasource = new MatTableDataSource<Category>([]);
  displayedColumns = [
    'code',
    'name',
    'actions',

  ];

  searchControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly categorySvc: CategoryService,
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

  openDialog(category?: Category) {
    this.dialog
      .open(CategoriesDetailComponent, {
        width: '50%',
        hasBackdrop: true,
        data: {
          category,
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

  remove(category: Category) {
    if (!confirm('¿Está seguro de eliminar?')) {
      return;
    }

    this.categorySvc
      .delete(category.code)
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
    this.categorySvc
      .list(search)
      .pipe(tap((results) => (this.datasource.data = results)))
      .subscribe();
  }
}
