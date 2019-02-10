import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { UiFramModule } from './ui-fram/uiFram.module';
import { FormBuilder } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';




// Initialize Firebase
// var Firebase = {
//     apiKey: "AIzaSyBfA5w7CUKT23uHkqBKiq5FRT4e2BygeqE",
//     authDomain: "teamchat-4c14f.firebaseapp.com",
//     databaseURL: "https://teamchat-4c14f.firebaseio.com",
//     projectId: "teamchat-4c14f",
//     storageBucket: "teamchat-4c14f.appspot.com",
//     messagingSenderId: "122844921777"
// };
@NgModule({
    imports: [
        BrowserModule,
        UiFramModule,
        HttpModule
        // AngularFireModule.initializeApp(Firebase),
        // AngularFirestoreModule,
    ],
    declarations: [
        AppComponent
    ],
    providers:[ChatService,FormBuilder, HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
