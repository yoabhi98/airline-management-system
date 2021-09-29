import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CreateAirlineComponent } from "./create-airline/create-airline.component";
import { DeleteAirlineComponent } from "./delete-airline/delete-airline.component";
import { ModifyAirlineComponent } from "./modify-airline/modify-airline.component";
import { ViewAirlineComponent } from "./view-airline/view-airline.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "create", component: CreateAirlineComponent },
      { path: "modify", component: ModifyAirlineComponent },
      { path: "delete", component: DeleteAirlineComponent },
      { path: "view", component: ViewAirlineComponent },
      { path: "**", redirectTo: "" }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
