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
  centralLatitude: number = 52.379189;
  centralLongitude: number = 4.899431;
  radius: number = 0.035234;
  newLatitude: number;
  newLongitude: number;

  constructor() {
  }

  createLatitude() {
    let randomNumber = Math.random() * (1 - (-1)) + (-1);
    this.newLatitude = (randomNumber * this.radius) + this.centralLatitude;
    return this.newLatitude;
  }

  createLongitude() {
    let randomNumber = Math.random() * (1 - (-1)) + (-1);
    this.newLongitude = (randomNumber * this.radius) + this.centralLongitude;
    return this.newLongitude;
  }

  public static createSampleScooter(pId = 0): Scooter {
    this.tag = Math.random().toString(36).substring(2, 10);
    const enumValues = Object.values(ScooterStatus);
    const number = Math.floor(Math.random() * enumValues.length);
    this.status = enumValues[number];
    this.gpsLocation = this.createLatitude() + ", " + this.createLongitude();
    this.mileage = Math.floor(Math.random() * 10000);
    this.batteryCharge = Math.floor(Math.random() * (100 - 5 + 1) + 5);
    return null;
  }
}

