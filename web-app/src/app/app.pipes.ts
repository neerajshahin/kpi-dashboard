//file name: remove-spaces.ts
import { Pipe, PipeTransform } from '@angular/core';
var numeral = require('numeral');

@Pipe({
	name : "numberFormat"
})

export class NumberFormat implements PipeTransform {
	transform(value: string, args: string[]): any{
    if (!value) return value;
		return numeral(value).format(args).toUpperCase();
	}
}
