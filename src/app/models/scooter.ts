enum ScooterStatus {
  idle = 'IDLE',
  inuse = 'INUSE',
  maintenance = 'MAINTENANCE',
}

export class Scooter{
  public id: number;
  public tag: string;
  public status: ScooterStatus;
  public gpsLocation: string;
  public mileage: number;
  public batteryCharge: number;

  constructor() {}


  public static createSampleScooter(pId = 0): Scooter {
    this.tag = Math.random().toString(36).substring(2, 10);
    const enumValues = Object.values(ScooterStatus);
    const number = Math.floor(Math.random() * enumValues.length);
    this.status = enumValues[number];
    this.gpsLocation;
    this.mileage = Math.floor(Math.random() * 10000);
    this.batteryCharge = Math.floor(Math.random() * (100 - 5 + 1) + 5);
    return null;
  }
}

