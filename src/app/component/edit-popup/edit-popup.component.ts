import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  productForm: FormGroup;

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<any>();

  onConfirm() {
    this.confirm.emit(this.productForm.value);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter =
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value);

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, this.specialCharacterValidator()]],
      image: [''],
      price: ['', [Validators.required]],
      rating: [0],
    });
  }

  ngOnChanges() {
    this.productForm.patchValue({
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      rating: this.product.rating,
    });
  }
}
