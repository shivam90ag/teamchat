import { NgModule } from "@angular/core";
import { ChatBoxComponent } from "./chatBox.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports:[BrowserModule,FormsModule],
    declarations: [
        ChatBoxComponent
    ],
    exports:[ChatBoxComponent]
})
export class ChatBoxModule { }
