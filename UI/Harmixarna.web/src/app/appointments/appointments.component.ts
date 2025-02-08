import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html'
})
export class AppointmentComponent implements OnInit{

  constructor(public service : AppointmentService){

  }
  ngOnInit(): void {
    this.service.refreshList();
  }
}

