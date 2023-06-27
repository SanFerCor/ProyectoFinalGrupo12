import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { IndexDetailComponent } from './detail/index-detail.component';
import { CategoryService } from '../shared/services/category.service';
import { ProductService } from '../shared/services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [IndexDetailComponent],
  providers: [ProductService],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexDetailComponent,
      },
    ]),
  ],
})
export class IndexModule {}
