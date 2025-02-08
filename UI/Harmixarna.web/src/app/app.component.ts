import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentComponent } from "./appointments/appointments.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppointmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Harmixarna.web';
}
