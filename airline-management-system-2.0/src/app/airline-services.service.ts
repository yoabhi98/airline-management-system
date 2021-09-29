import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Airline } from "./airline";
@Injectable()
export class AirlineServicesService {
  private airlines: Airline[];
  public myAirlinesInfo = [
    { code: "6E-", name: "INDIGO" },
    { name: "SPICEJET", code: "SG-" },
    { code: "EK-", name: "Emirates" },
    { name: "AIR ASIA", code: "I5-" },
    { name: "GO AIR", code: "G8-" },
    { name: "JET AIRWAYS", code: "9W-" },
    { name: "AIR INDIA", code: "AI-" }
  ];
  private airlinesUrl = "api/airLines"; // URL to web api

  constructor(private http: HttpClient) {}

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.airlinesUrl);
  }
  getAirline(id: number): Observable<Airline> {
    const url = `${this.airlinesUrl}/${id}`;
    return this.http.get<Airline>(url);
  }

  addAirline(airline: Airline): Observable<Airline> {
    //  const airline = { providerName, providerCode, providerType };
    return this.http.post<Airline>(this.airlinesUrl, airline);
  }

  updateAirline(
    airline: Airline,
    id: number,
    name: string
  ): Observable<Airline> {
    airline.id = id;
    airline.providerName = name;
    //  const airline = { providerName, providerCode, providerType };
    return this.http.put<Airline>(this.airlinesUrl, airline);
  }

  deleteAirline(airline: number | Airline): Observable<Airline> {
    const id = typeof airline === "number" ? airline : airline.id;
    const url = `${this.airlinesUrl}/${id}`;
    console.log("id", id);

    return this.http.delete<Airline>(url);
  }
}
