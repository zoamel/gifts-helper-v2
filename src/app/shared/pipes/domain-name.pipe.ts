import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domainName',
})
export class DomainNamePipe implements PipeTransform {
  private extractHostname(url: string): string {
    let hostname;

    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
  }

  transform(value: string | undefined, ...args: unknown[]): string {
    if (!value) {
      return '-';
    }

    return this.extractHostname(value);
  }
}
