import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MarcaListComponent } from './list/marca-list.component';
import { MarcaService } from '../shared/services/marca.service';
import { RouterModule } from '@angular/router';
import { MarcasDetailComponent } from './detail/marcas-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../shared/services/category.service';

@NgModule({
  declarations: [MarcaListComponent, MarcasDetailComponent],
  providers: [MarcaService],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MarcaListComponent,
      },
    ]),
  ],
})
export class MarcasModule {}
