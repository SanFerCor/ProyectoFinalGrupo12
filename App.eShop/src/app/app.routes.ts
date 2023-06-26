import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
];
