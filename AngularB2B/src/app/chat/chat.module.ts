import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatDialogComponent } from '../components/chat-dialog/chat-dialog.component';
import { ChatService } from '../services/chat.service';




@NgModule({
  declarations: [ChatDialogComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
 
  exports:[ChatDialogComponent],
  providers:[ChatService]
})
export class ChatModule { }
