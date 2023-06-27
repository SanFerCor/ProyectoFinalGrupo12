import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { MarcaService } from 'src/app/shared/services/marca.service';

@Component({
  templateUrl: './marcas-detail.component.html',
})
export class MarcasDetailComponent implements OnInit {

  isNew: boolean;

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly marcaSvc: MarcaService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<MarcasDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {}

  ngOnInit(): void {
    this.isNew = !this.data?.marca;

    this.form = this.fb.group({
      estado: [ null, Validators.required],
      name: [null, Validators.required],
    });

    if (!this.isNew) {
      this.form.patchValue(this.data.marca);
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
      obs$ = this.marcaSvc.add(this.form.getRawValue());
    } else {
      obs$ = this.marcaSvc.update(this.form.getRawValue());
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
