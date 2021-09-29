import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Airline } from "./airline";
import { AirlineServicesService } from "./airline-services.service";
//import { throwError} from 'rxjs';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private airlines: Airline[];

  constructor(private airService: AirlineServicesService) {}

  ngOnInit() {
    this.airService.getAirlines().subscribe(data => (this.airlines = data));
  }
}
