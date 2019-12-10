import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  // For fetching contact list
  getData(){
    this.firebaseService.getContacts()
    .subscribe(result => {
      this.items = result;
    })
  }

  // For creating new contact
  createContact(){
    this.firebaseService.currentContact = null;
    this.router.navigate(['/new-contact']);
  }

  // For creating new contact
  updateContact(item){
    this.firebaseService.currentContact = item;
    this.router.navigate(['/new-contact']);
  }

  //For delete contact
  deleteContact(item){
    this.firebaseService.deleteContact(item.payload.doc.id)
    .then(
      (res => {
        this.router.navigate(['/home']);
      }),
      err => {
        console.log(err);
      }
    )
  }
}
