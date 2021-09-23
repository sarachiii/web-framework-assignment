enum ScooterStatus {
  idle = 'IDLE',
  inuse = 'INUSE',
  maintenance = 'MAINTENANCE',
}

export class Scooter {
  public id: number = 29997;
  public tag: string;
  public status: ScooterStatus;
  public gpsLocation: string;
  public mileage: number;
  public batteryCharge: number;

  static centralLatitude: number = 52.379189;
  static centralLongitude: number = 4.899431;
  static radius: number = 0.035234;
  static newLatitude: number;
  static newLongitude: number;

  constructor(pId: number, tag: string, status: ScooterStatus, gpsLocation: string, mileage: number, batteryCharge: number) {
    this.id = pId;
    this.tag = tag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.mileage = mileage;
    this.batteryCharge = batteryCharge;
  }

  static createLatitude() {
    let randomNumber = Math.random() * (1 - (-1)) + (-1);
    this.newLatitude = (randomNumber * this.radius) + this.centralLatitude;
    return this.newLatitude.toFixed(4) + "N";
  }

  static createLongitude() {
    let randomNumber = Math.random() * (1 - (-1)) + (-1);
    this.newLongitude = (randomNumber * this.radius) + this.centralLongitude;
    return this.newLongitude.toFixed(4) + "E";
  }

  public static createSampleScooter(pId = 0): Scooter {
    let tag = Math.random().toString(36).substring(2, 10);
    const enumValues = Object.values(ScooterStatus);
    const number = Math.floor(Math.random() * enumValues.length);
    let status = enumValues[number];
    let gpsLocation = this.createLatitude() + ", " + this.createLongitude();
    let mileage = Math.floor(Math.random() * 10000);
    let batteryCharge = Math.floor(Math.random() * (100 - 5 + 1) + 5);
    return new Scooter(pId, tag, status, gpsLocation, mileage, batteryCharge);
  }
}
