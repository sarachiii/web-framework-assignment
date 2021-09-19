enum ScooterStatus {
  idle = 'IDLE',
  inuse = 'INUSE',
  maintenance = 'MAINTENANCE',
}

export class Scooter{
  public id: number;
  public static tag: string;
  public static status: ScooterStatus;
  public static gpsLocation: string;
  public static mileage: number;
  public static batteryCharge: number;
  static centralLatitude: number = 52.379189;
  static centralLongitude: number = 4.899431;
  static radius: number = 0.035234;
  static newLatitude: number;
  static newLongitude: number;

  constructor() {
  }

  static createLatitude() {
    let randomNumber = Math.random() * (1 - (-1)) + (-1);
    this.newLatitude = (randomNumber * this.radius) + this.centralLatitude;
    return this.newLatitude;
  }

  static createLongitude() {
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

