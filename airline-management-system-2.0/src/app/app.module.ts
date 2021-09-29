import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";

import { AppComponent } from "./app.component";
import { AirlineServicesService } from "./airline-services.service";
import { CreateAirlineComponent } from "./create-airline/create-airline.component";
import { AppRoutingModule } from "./app.routing.module";
import { DeleteAirlineComponent } from "./delete-airline/delete-airline.component";
import { ModifyAirlineComponent } from "./modify-airline/modify-airline.component";
import { ViewAirlineComponent } from './view-airline/view-airline.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    AppComponent,
    CreateAirlineComponent,
    DeleteAirlineComponent,
    ModifyAirlineComponent,
    ViewAirlineComponent,
    FilterPipe
  ],
  providers: [InMemoryDataService, AirlineServicesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
