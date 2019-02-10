import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { UiFramModule } from './ui-fram/uiFram.module';
import { FormBuilder } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        UiFramModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers:[ChatService,FormBuilder, HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
