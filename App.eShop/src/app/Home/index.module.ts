import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { IndexDetailComponent } from './detail/index-detail.component';
import { CategoryService } from '../shared/services/category.service';
import { ProductService } from '../shared/services/product.service';

@NgModule({
  declarations: [IndexDetailComponent],
  providers: [ProductService],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexDetailComponent,
      },
    ]),
  ],
})
export class IndexModule {}
