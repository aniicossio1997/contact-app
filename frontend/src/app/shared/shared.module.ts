import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLettersPipePipe } from './pipes/first-letters-pipe.pipe';
import { RouterModule } from '@angular/router';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';



@NgModule({
  declarations: [
    FirstLettersPipePipe,
    PhoneFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports:[FirstLettersPipePipe, PhoneFormatPipe]
})
export class SharedModule { }
