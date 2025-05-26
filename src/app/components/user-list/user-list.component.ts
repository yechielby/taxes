import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isCreating = false;
  isEditing = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  createUser(): void {
    this.isCreating = true;
    this.isEditing = false;
    this.selectedUser = null;
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
    this.isCreating = false;
  }

  deleteUser(id: number ): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  onUserSaved(user: User): void {
    if (this.isCreating) {
      this.userService.createUser(user).subscribe({
        next: (newUser) => {
          this.users.push(newUser);
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
    } else if (this.isEditing && this.selectedUser) {
      this.userService.updateUser(user).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.isEditing = false;
    this.isCreating = false;
  }
}
