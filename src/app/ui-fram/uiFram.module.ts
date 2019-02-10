import { NgModule } from "@angular/core";
import { UiFramComponent } from "./uiFram.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChatBoxModule } from "../chat-box/chatBox.module";

@NgModule({
    imports:[FormsModule, ReactiveFormsModule, CommonModule,ChatBoxModule],
    declarations: [
        UiFramComponent
    ],
    exports:[UiFramComponent]
})
export class UiFramModule { }
