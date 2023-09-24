import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';

const modules=[
    TableModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    CardModule,
    DividerModule,
    MenubarModule,
    SpeedDialModule,
    MenuModule,
    ConfirmDialogModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    DropdownModule
]

@NgModule({
  exports: [
    ...modules
  ],
  imports: [
  ],

})
export class PrimeModule { }