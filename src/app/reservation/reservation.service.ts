import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //private reservations: Reservation[] = [];

  constructor(private httpClient:HttpClient) { }

  callBackendGetAll(): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>('http://localhost:8080/api/getReservations');
  }

  callBackendSave(reservation: Reservation): Observable<Reservation>{
    //this.reservations.push(reservation);
    console.log('reservation email:'+ reservation.guestMail)
    return this.httpClient.post<Reservation>('http://localhost:8080/api/addReservation',reservation);    
  }

  callBackendUpdate(reservation: Reservation, id: string): Observable<Reservation>{
    //this.reservations.push(reservation);
    console.log('Update reservation:')
    return this.httpClient.put<Reservation>('http://localhost:8080/api/updateReservation/'+id,reservation);    
  }

  callBackendDelete(id: string){
    console.log('reservation id to be deleted:'+ id)
    return this.httpClient.delete('http://localhost:8080/api/deleteReservation/'+ id); 
  }

  callBackendGetById(id: string): Observable<Reservation>{
    return this.httpClient.get<Reservation>('http://localhost:8080/api/getReservationById/' + id);
  }
}
