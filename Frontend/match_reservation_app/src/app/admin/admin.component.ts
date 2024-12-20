import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin',
  standalone: false,

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../app.component.css'],
})
export class AdminComponent implements OnInit {
  allUsers: {
    _id: string;
    username: string;
    email: string;
    role: string;
    status: string;

  } | any = [];
  constructor(private dataservice: UserService) {
  }
  ngOnInit(): void {
    this.dataservice.getAllusers().subscribe((data) => {
      console.log(data);
      this.allUsers = data['users'];
    });
  }
  addAuthority(userId: string) {
    const user = this.allUsers.find((u: { _id: string }) => u._id === userId);
    console.log(user);
    
    if (user) {
      user.isManager = true;
      /*{
  "customerUsername": "string",
  "status": "Pending"
} */
      const form: any = {
        "customerUsername": user.username,
        "status": user.status
      }
      console.log(form);
      this.dataservice.approveUser(user.username, form).subscribe((data) => {
        console.log("heeeeeeeeeeeeeeeeeeeeeer")
        console.log(data);
        user.role = "Manager";
      }
      );
    }
  }

  removeAuthority(userId: number) {
    const user = this.allUsers.find((u: { id: number }) => u.id === userId);
    if (user) {
      user.isManager = false;
    }
  }

  removeUserAccount(userId: string) {
    const user = this.allUsers.find((u: { _id: string }) => u._id === userId);
    this.allUsers = this.allUsers.filter((u: { _id: string }) => u._id !== userId);

    this.dataservice.deleteUser(user.username).subscribe((data) => {
      console.log(data);
    });
  }
}
