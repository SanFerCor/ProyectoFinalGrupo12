import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  categories = [
    {
      text: 'Abarrotes',
      value: 'AB',
    },
    {
      text: 'Panaderia y Pasteleria',
      value: 'PA',
    },
    {
      text: 'Bebidas',
      value: 'BE',
    },
    {
      text: 'Cuidado Personal y Salud',
      value: 'CP',
    },
    {
      text: 'Lacteos y huevos',
      value: 'LA',
    },
  ];

  uoms = [
    {
      code: 'KGM',
      name: 'KILOGRAMOS',
      symbol: 'KG',
    },
    {
      code: 'NIU',
      name: 'UNIDAD',
      symbol: 'UN',
    },
    {
      code: 'BG',
      name: 'BOLSA',
      symbol: 'BOL ',
    },
    {
      code: 'BO',
      name: 'BOTELLA',
      symbol: 'BOT ',
    },
    {
      code: 'BX',
      name: 'CAJA',
      symbol: 'CAJ ',
    },
    {
      code: 'D64',
      name: 'BARRIL',
      symbol: 'BL ',
    },
    {
      code: 'DAY',
      name: 'DIA',
      symbol: 'DíA ',
    },
    {
      code: 'FOT',
      name: 'PIE',
      symbol: 'PIE ',
    },
    {
      code: 'FTK',
      name: 'PIE CUADRADO',
      symbol: 'PI2 ',
    },
    {
      code: 'GLL',
      name: 'GALON',
      symbol: 'GAL ',
    },
    {
      code: 'HUR',
      name: 'HORA',
      symbol: 'H ',
    },
  ];

  isNew: boolean;

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productSvc: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {}

  ngOnInit(): void {
    this.isNew = !this.data?.product;

    this.form = this.fb.group({
      code: [{ value: null, disabled: !this.isNew }, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      uomCode: [null, Validators.required],
      categoryCode: [null, Validators.required],
    });

    if (!this.isNew) {
      this.form.patchValue(this.data.product);
    }
  }


  save() {
    if (this.form.invalid) {
      this.snackBar.open('Hay problemas de validación', 'Ok', {
        horizontalPosition: 'end',
      });
      return;
    }

    let obs$: Observable<any>;

    if (this.isNew) {
      obs$ = this.productSvc.add(this.form.getRawValue());
    } else {
      obs$ = this.productSvc.update(this.form.getRawValue());
    }

    obs$
      .pipe(
        tap(() => {
          this.snackBar.open('Se guardó correctamente', 'Ok', {
            horizontalPosition: 'end',
          });
          this.dialogRef.close(true);
        }),
        catchError((xhr) => {
          console.error(xhr);
          this.snackBar.open('Hubo un error al momento de guardar.', 'Ok', {
            horizontalPosition: 'end',
          });
          return of(null);
        })
      )
      .subscribe();
  }
}
