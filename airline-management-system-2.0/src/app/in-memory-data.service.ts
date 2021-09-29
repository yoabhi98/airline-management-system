import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let airLines = [
      {
        id: 1,
        providerName: "JET AIRWAYS",
        providerCode: "9W-",
        providerType: "Domestic"
      },
      {
        id: 2,
        providerName: "EMIRATES",
        providerCode: "EK-",
        providerType: "International"
      }
    ];

    return { airLines };
  }
}
