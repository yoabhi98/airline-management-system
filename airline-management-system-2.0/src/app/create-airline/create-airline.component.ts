import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { Airline } from "../airline";
import { AirlineServicesService } from "../airline-services.service";
@Component({
  selector: "app-create-airline",
  templateUrl: "./create-airline.component.html",
  styleUrls: ["./create-airline.component.css"]
})
export class CreateAirlineComponent implements OnInit {
  code: string = "select provider name";
  private airline: Airline;
  private myAirlinesInfo = this.airService.myAirlinesInfo;
  private providerType: string[] = ["Domestic", "International"];
  constructor(
    private fb: FormBuilder,
    private airService: AirlineServicesService,
    private router: Router
  ) {}
  form: FormGroup;
  ngOnInit() {
    this.form = this.fb.group({
      providerName: [null, Validators.required],
      providerCode: [null],
      providerType: [null, Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.form.patchValue({ providerCode: this.code });
    console.log(this.form.value);
    //get full list and search for existance
    this.airService.getAirlines().subscribe(data => {
      console.log(data);
      if (
        data.find(
          i =>
            i.providerCode === this.code &&
            i.providerType === this.form.get("providerType").value
        )
      ) {
        alert("Flight Already Exist");
      } else {
        this.airService.addAirline(this.form.value).subscribe();
        this.router.navigate([""]);
      }
    });
    // console.log(this.form.value.providerCode);
  }
  changeProviderName(e) {
    let val = e.target.value;

    this.code = this.airService.myAirlinesInfo.find(i => i.name === val).code;
    console.log(e.target.value);
  }
}
