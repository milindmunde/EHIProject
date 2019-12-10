import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  title: string;
  userForm: FormGroup;
  item: any;
  btnTitle: string;
  MOBILE_PATTERN = /[0-9\+\-\ ]/;
  satusList: any = [
    {value: 'Active', viewValue: 'Active'},
    {value: 'In Active', viewValue: 'In Active'}
  ];
  validation_messages = {
   'firstName': [
     { type: 'required', message: 'First Name is required.' }
   ]
 };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    if (this.firebaseService.currentContact === null) {
      this.title = 'Create Contact'
      this.btnTitle = 'Create';
      this.createForm();
    } else {
      this.title = 'Update Contact'
      this.btnTitle = 'Update'
      this.item = this.firebaseService.currentContact
      this.initializeValue();
    }
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.minLength(6), Validators.maxLength(10), Validators.pattern(this.MOBILE_PATTERN)]],
      status: ['']
    });
  }

  //For initialize form values in update view
  initializeValue(){
    this.userForm = this.fb.group({
      firstName: new FormControl(this.item.payload.doc.data().firstName, Validators.required),
      lastName: new FormControl(this.item.payload.doc.data().lastName),
      email: new FormControl(this.item.payload.doc.data().email, [ Validators.required, Validators.email] ),
      phone: new FormControl(this.item.payload.doc.data().phone, [Validators.minLength(6), Validators.maxLength(10), Validators.pattern(this.MOBILE_PATTERN)]),
      status: new FormControl(this.item.payload.doc.data().status),
    });
  }

  //For update / create contact
  onSubmit(value){
    if( this.btnTitle === 'Update') {
      this.firebaseService.updateContact(this.item.payload.doc.id, value).then(res => {
        this.router.navigate(['/home']);
      });
    } else {
      this.firebaseService.createContact(value).then(res => {
        this.router.navigate(['/home']);
      });
    }
  }

}
