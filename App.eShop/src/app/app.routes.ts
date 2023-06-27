import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./home/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },

  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },

];
