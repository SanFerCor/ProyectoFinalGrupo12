import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      uomCode: [null, Validators.required],
      categoryCode: [null, Validators.required],
    });
  }
}
