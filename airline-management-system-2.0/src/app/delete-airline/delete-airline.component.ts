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
  selector: "app-delete-airline",
  templateUrl: "./delete-airline.component.html",
  styleUrls: ["./delete-airline.component.css"]
})
export class DeleteAirlineComponent implements OnInit {
  deleteId: number;
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
    console.log(this.form.value);
    //this.form.patchValue({ providerCode: this.code });
    console.log(this.form.value);
    //get full list and search for existance
    this.airService.getAirlines().subscribe(data => {
      console.log(data);
      //value is default one
      console.log(this.code);
      if (
        data.find(
          i =>
            i.providerCode === this.form.get("providerCode").value &&
            i.providerType === this.form.get("providerType").value
        )
      ) {
        this.airService.deleteAirline(this.deleteId).subscribe();
        this.router.navigate([""]);
      } else {
        alert("Flight with particular provider type does not exist");
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
        this.deleteId = existedData.id;

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
