import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  

  url: string = environment.apiBaseUrl + '/Appointment'
  list: Appointment[] = []
  constructor(private http: HttpClient) {}

  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next: res => {
        this.list= res as Appointment[]
      },
      error: err => { console.log(err) }
    })
  }
}
