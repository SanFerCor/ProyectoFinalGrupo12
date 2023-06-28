import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
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

  categories$: Observable<Category[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productSvc: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly categorySvc: CategoryService,
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
      imagePath: [null],
      imageFileName: [null],
    });

    if (!this.isNew) {
      this.form.patchValue(this.data.product);
    }

    this.categories$ = this.categorySvc.list();
  }

  async onFileUpload($event: any) {
    const file = $event.target.files[0] as File;
    const base64 = await this.blobToBase64DataURL(file);
    this.form.controls['imageFileName'].setValue(file.name);
    this.form.controls['imagePath'].setValue(base64);
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

  private blobToBase64DataURL(blob) {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
