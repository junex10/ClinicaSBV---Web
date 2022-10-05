import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from 'src/app/shared';

@Pipe({
  name: 'formatMiles'
})
export class FormatMilesPipe implements PipeTransform {

  transform(
    n: any,
    decimals: any = true,
    currency: string = Constants.CURRENCIES.DOLAR,
    conversion: number = 1
  ): string {
    n = Math.round(n * 100) / 100;
		var c: any = isNaN(c = Math.abs(c)) ? 2 : c,
			d: any = d == undefined ? "," : d,
			t: any = t == undefined ? "." : t,
			s: any = n < 0 ? "-" : "",
			i: any = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
			j: any = (j = i.length) > 3 ? j % 3 : 0;

		const amount = currency + ' ' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

    if (currency == Constants.CURRENCIES.DOLAR)
      return Constants.CURRENCIES.DOLAR + amount;
    else if (currency == Constants.CURRENCIES.BOLIVAR)
      return Constants.CURRENCIES.BOLIVAR + amount;
    else if (currency == 'Km')
      return amount + ' ' + currency;
    else return amount;
  }

}
