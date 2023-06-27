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
import { MarcaService } from 'src/app/shared/services/marca.service';
import { MarcasDetailComponent } from '../detail/marcas-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Marca } from 'src/app/shared/models/marca.model';

@Component({
  templateUrl: './marca-list.component.html',
})
export class MarcaListComponent implements OnInit, OnDestroy {
  datasource = new MatTableDataSource<Marca>([]);
  displayedColumns = [
    'name',
    'code',
    'actions',
  ];

  searchControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly marcaSvc: MarcaService,
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

  openDialog(marca?: Marca) {
    this.dialog
      .open(MarcasDetailComponent, {
        width: '50%',
        hasBackdrop: true,
        data: {
          marca,
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

  remove(marca: Marca) {
    if (!confirm('¿Está seguro de eliminar?')) {
      return;
    }

    this.marcaSvc
      .delete(marca.name)
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
    this.marcaSvc
      .list(search)
      .pipe(tap((results) => (this.datasource.data = results)))
      .subscribe();
  }
}