import { NgModule } from "@angular/core";
import { ChatBoxComponent } from "./chatBox.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports:[BrowserModule],
    declarations: [
        ChatBoxComponent
    ],
    exports:[ChatBoxComponent]
})
export class ChatBoxModule { }
