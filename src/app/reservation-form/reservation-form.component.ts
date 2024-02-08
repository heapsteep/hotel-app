import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
  formGroup_1: FormGroup=new FormGroup({});
  
  
  constructor(
    private formBuilder:FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
  }

  ngOnInit(){
      this.formGroup_1=this.formBuilder.group({
        checkInDate:['',Validators.required],
        checkOutDate:['',Validators.required],
        guestName:['',Validators.required],
        guestMail:['', [Validators.required, Validators.email] ]
      });

      //fetch the id from the path parameter:
      let id = this.activatedRoute.snapshot.paramMap.get('id');      
      if(id){
        this.reservationService.callBackendGetById(id).subscribe(
         x => {           
           if(x) //checking if x is not undefined. Is it the right way ?
              this.formGroup_1.patchValue(x)
          }
        );        
      }
  }

  onSubmit(){
    console.log('onSubmit called..')
    if(this.formGroup_1.valid){
      console.log('valid')
      let reservation: Reservation = this.formGroup_1.value;
      //check whether the id already exits, if yes its an update and not an create:
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){//update
        this.reservationService.callBackendUpdate(reservation,id).subscribe(
          x => this.handleSuccessMessage(x)
        );
      }else{//create
        this.reservationService.callBackendSave(reservation).subscribe(
          x => this.handleSuccessMessage(x)
        );
      }
      this.router.navigate(['/list']);
    }
  }

  handleSuccessMessage(x : any){
    console.log('Data inside handleSuccessMessage:' + x)
    //console.log('Data inside handleSuccessMessage:' + x[0].name)    
  }
}
