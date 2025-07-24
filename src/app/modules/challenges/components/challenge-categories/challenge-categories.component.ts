import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ICategory } from './models/Icategory';
import Swal from 'sweetalert2';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenge-categories',
  templateUrl: './challenge-categories.component.html',
  styleUrls: ['./challenge-categories.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ChallengeCategoriesComponent implements OnInit {
  categories!: ICategory[];
  category!: ICategory;
  catFrom!: FormGroup;
  catId!: number | null;
  updatedCategoryName!: string;
  constructor(
    private categoryServices: CategoryService,
    private toastrServices: ToastService,
    private fb: FormBuilder
  ) {
    this.catFrom = fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.categoryServices.Get().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.log(err),
    });
  }
  AddCategory() {
    this.category = this.catFrom.value;
    this.categoryServices.Add(this.category).subscribe({
      next: (res) => {
        this.toastrServices.show('category added succesfully', 'success');
        this.categories.push(res);
      },
      error: (err) => {
        const msg = err.error?.err || 'somthing went wrong';
        this.toastrServices.show(msg, 'error');
      },
    });
  }
  Edite(id: number) {}
  Delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      this.categoryServices.Delete(id).subscribe({
        next: (res) => {
          this.toastrServices.show('Delete role happen succesfully', 'success');
          this.categories = this.categories.filter((cat) => cat.id != id);
        },
        error: (err) => {
          const msg = err.error?.error || 'somthing went wrong';
          this.toastrServices.show(msg, 'error');
        },
      });
    });
  }
  startEdit(category: any) {
    this.catId = category.id;
    this.updatedCategoryName = category.name;
  }

  saveEdit(category: any) {
    const updatedCategory = {
      ...category,
      name: this.updatedCategoryName,
    };

    this.categoryServices.Update(updatedCategory).subscribe({
      next: (res) => {
        category.name = res.name;
        this.toastrServices.show('Category updated successfully', 'success');
        this.catId = null;
      },
      error: (err) => {
        const msg = err.error?.error || 'Update failed';
        this.toastrServices.show(msg, 'error');
      },
    });
  }

  cancelEdit() {
    this.catId = null;
  }
}
