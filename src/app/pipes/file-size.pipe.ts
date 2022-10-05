import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})

export class FileSizePipe implements PipeTransform {
  transform = (size: number) => (size > 1024 && size < 1048576) ? `${(size / 1024).toFixed(2)} KB` :
    (size >= 1048576 && size < 1073741824) ? `${(size / 1048576).toFixed(2)} MB` :
      (size >= 1073741824 && size < 1099511627776) ? `${(size / 1073741824).toFixed(2)} GB` :
        (size >= 1099511627776) ? `${(size / 1073741824 * 1024).toFixed(2)} TB` : `${size.toFixed(2)} Bytes`
}
