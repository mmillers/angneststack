import { Injectable, PipeTransform } from '@nestjs/common';
import { IdentifierException } from '../exceptions/identifier.exception';

@Injectable()
export class ParseIntCodePipe implements PipeTransform<any, number> {
    transform(value: any): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new IdentifierException();
        }
        return val;
    }
}
