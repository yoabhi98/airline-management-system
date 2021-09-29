import { Component, OnInit } from "@angular/core";
import { Airline } from "../airline";
import { AirlineServicesService } from "../airline-services.service";

@Component({
  selector: "app-view-airline",
  templateUrl: "./view-airline.component.html",
  styleUrls: ["./view-airline.component.css"]
})
export class ViewAirlineComponent implements OnInit {
  private airlines: Airline[];

  constructor(private airService: AirlineServicesService) {}

  ngOnInit() {
    this.airService.getAirlines().subscribe(data => (this.airlines = data));
  }
}
