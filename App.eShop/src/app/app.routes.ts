import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./Home/index.module').then((m) => m.IndexModule),
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

  {
    path: 'marcas',
    loadChildren: () =>
      import('./marca/marcas.module').then((m) => m.MarcasModule),
  },

];
