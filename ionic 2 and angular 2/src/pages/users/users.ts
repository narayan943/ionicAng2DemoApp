import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { User } from '../../models/user';
import { UserDetailsPage } from '../user-details/user-details';
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  users: User[];
   originalUsers: User[];


  constructor(public navCtrl: NavController , private githubUsersProvider:GithubUsersProvider) {
    githubUsersProvider.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    },error => {
      console.error(error);
    });
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsersProvider.searchUsers(term).subscribe(users => {
        this.users = users
      },error => {
      console.error(error);
    });
    }
  }

  goToDetails(login: string) {
    console.log(login);
    this.navCtrl.push(UserDetailsPage, {login});
  }

  ionViewDidLoad() {
    console.log('Hello Users Page');
  }
}