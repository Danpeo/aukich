export class Random {
  private static readonly hexChars: string = '0123456789ABCDEF';

  static generateHexColor(): string {
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += this.hexChars[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  static generateFloat(min: number = 0, max: number = Number.MAX_VALUE): number {
    return Math.random() * (max - min) + min;
  }
}
