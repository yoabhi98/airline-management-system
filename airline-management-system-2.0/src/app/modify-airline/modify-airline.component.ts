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
  selector: "app-modify-airline",
  templateUrl: "./modify-airline.component.html",
  styleUrls: ["./modify-airline.component.css"]
})
export class ModifyAirlineComponent implements OnInit {
  modifyId: number;
  modifyName: string;
  code: string = "select provider name";
  private airline: Airline;
  private myAirlinesInfo = this.airService.myAirlinesInfo;
  private providerType: string[] = ["Domestic", "International"];

  form: FormGroup;
  ngOnInit() {
    this.form = this.fb.group({
      providerCode: [null, Validators.required],
      providerType: [null, Validators.required]
    });
    this.form.get("providerType").disable();
  }
  constructor(
    private fb: FormBuilder,
    private airService: AirlineServicesService,
    private router: Router
  ) {}
  get f() {
    return this.form.controls;
  }

  submit() {
    //this.form.patchValue({ providerCode: this.code });
    console.log(this.form.value);
    //get full list and search for existance
    this.airService.getAirlines().subscribe(data => {
      console.log(data);

      if (
        data.find(
          i =>
            i.providerCode === this.form.get("providerCode").value &&
            i.providerType === this.form.get("providerType").value
        )
      ) {
        alert("****This Flight already have chosen provider type.*****");
      } else {
        console.log("hi", this.form.value);
        this.airService
          .updateAirline(this.form.value, this.modifyId, this.modifyName)
          .subscribe();
        this.router.navigate([""]);
      }
    });
    // console.log(this.form.value.providerCode);
  }
  checkProviderExistance(e) {
    let val = e.target.value;

    // this.code = this.myAirlinesInfo.find(i => i.name === val).code;
    this.airService.getAirlines().subscribe(data => {
      console.log(data);
      let existedData = data.find(i => i.providerCode === val);
      if (existedData) {
        this.modifyId = existedData.id;
        this.modifyName = existedData.providerName;
        this.form.get("providerType").enable();
      } else {
        alert("Flight does not Exist");
        this.form.reset();
        this.form.get("providerType").disable();
      }
    });
    console.log(e.target.value);
  }
}
