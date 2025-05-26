import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Input() isEditing = false;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  userForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.userForm) {
      this.resetForm();
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: ['']
      })
    });

    this.resetForm();
  }

  resetForm(): void {
    if (this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        address: this.user.address || {
          street: '',
          suite: '',
          city: '',
          zipcode: ''
        }
      });
    } else {
      this.userForm.reset({
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: ''
        }
      });
    }
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const formData = this.userForm.value;
    const userData: User = {
      ...formData,
      id: this.user?.id
    };

    this.save.emit(userData);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }
}
