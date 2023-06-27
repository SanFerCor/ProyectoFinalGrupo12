import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  templateUrl: './categories-detail.component.html',
})
export class CategoriesDetailComponent implements OnInit {

  isNew: boolean;

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly categorySvc: CategoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<CategoriesDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {}

  ngOnInit(): void {
    this.isNew = !this.data?.category;

    this.form = this.fb.group({
      code: [{ value: null, disabled: !this.isNew }, Validators.required],
      name: [null, Validators.required],
    });

    if (!this.isNew) {
      this.form.patchValue(this.data.category);
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
      obs$ = this.categorySvc.add(this.form.getRawValue());
    } else {
      obs$ = this.categorySvc.update(this.form.getRawValue());
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
