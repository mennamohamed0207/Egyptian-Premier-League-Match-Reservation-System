import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../app.component.css'],
})
export class AdminComponent {
  allUsers = [
    { id: 1, email: 'user1@example.com', isManager: false },
    { id: 2, email: 'user2@example.com', isManager: false },
    { id: 3, email: 'user3@example.com', isManager: false },
    { id: 4, email: 'user4@example.com', isManager: true },
    { id: 5, email: 'user5@example.com', isManager: false },
    { id: 1, email: 'user1@example.com', isManager: false },
    { id: 2, email: 'user2@example.com', isManager: false },
    { id: 3, email: 'user3@example.com', isManager: false },
    { id: 4, email: 'user4@example.com', isManager: true },
    { id: 5, email: 'user5@example.com', isManager: false },
    { id: 1, email: 'user1@example.com', isManager: false },
    { id: 2, email: 'user2@example.com', isManager: false },
    { id: 3, email: 'user3@example.com', isManager: false },
    { id: 4, email: 'user4@example.com', isManager: true },
    { id: 5, email: 'user5@example.com', isManager: false },
    { id: 1, email: 'user1@example.com', isManager: false },
    { id: 2, email: 'user2@example.com', isManager: false },
    { id: 3, email: 'user3@example.com', isManager: false },
    { id: 4, email: 'user4@example.com', isManager: true },
    { id: 5, email: 'user5@example.com', isManager: false },
  ];

  addAuthority(userId: number) {
    const user = this.allUsers.find((u) => u.id === userId);
    if (user) {
      user.isManager = true;
    }
  }

  removeAuthority(userId: number) {
    const user = this.allUsers.find((u) => u.id === userId);
    if (user) {
      user.isManager = false;
    }
  }

  removeUserAccount(userId: number) {
    this.allUsers = this.allUsers.filter((u) => u.id !== userId);
  }
}
