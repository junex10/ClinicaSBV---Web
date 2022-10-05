import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatMilesPipe } from './format-miles.pipe';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  declarations: [
    FormatMilesPipe,
    FileSizePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
