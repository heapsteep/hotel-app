import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService){}

  ngOnInit(){
    this.reservationService.callBackendGetAll().subscribe(
      x => this.handleSuccessMessage(x)
    );
  }

  handleSuccessMessage(x : any){
    console.log('Data inside handleSuccessMessage:' + x)
    this.reservations=x;    
  }

  deleteReservation(id:string){
    this.reservationService.callBackendDelete(id).subscribe(
      x => this.ngOnInit()
    );    
  } 

}
