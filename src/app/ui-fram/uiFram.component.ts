import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ChatService } from '../chat.service';
declare var jQuery: any;


@Component({
    selector: 'ui-fram',
    templateUrl: './uiFram.component.html',
    styleUrls: ['./uiFram.component.css']
})
export class UiFramComponent {
    registerForm: FormGroup;
    newGroupForm: FormGroup;
    submittedGroupForm = false;
    submitted = false;
    countryList: Array<any> = [];
    selectedCountry: any = {};
    user: any;
    users: Array<any> = [];
    groups:Array<any>=[];
    token:any;
    activeTabUser:any;
    constructor(private formBuilder: FormBuilder, private httpService: HttpService, private chatService: ChatService) { }

    ngOnInit() {
        this.token = localStorage.getItem("userToken") || '';
        this.createForm()
        this.httpService.getWithObservable('https://restcountries.eu/rest/v2/all').subscribe((data) => {
            this.countryList = data.json();
            this.getProfile();

        })
        this.chatService.socket.emit('getUsersList',this.token);
        this.chatService.socket.on('usersList', (users: any) => {
            let userList: Array<any> = [];
            for (let key in users) {
                if (this.token && this.token != key){
                    users[key]['token']=key;
                    userList.push(users[key])

                }
            }
            this.users = JSON.parse(JSON.stringify(userList));
            this.chatService.users = JSON.parse(JSON.stringify(userList));
        });

    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    get gf() { return this.newGroupForm.controls; }
    getProfile() {
        if (this.token) {
            this.chatService.getUser(this.token, (user: any) => {
                if (user) {

                    this.user = user;
                    this.chatService.set('user', this.user)
                    this.setProfile(user)
                }
            }, (e: any) => {
            })
        }
    }
    createForm() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            countryName: ['', Validators.required],
            alpha2code: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
            callingCode: ['', Validators.required],
            currency: ['', Validators.required],
            timezone: ['', Validators.required],
            flag: ['', Validators.required]
        });
        this.newGroupForm = this.formBuilder.group({
            name: ['', Validators.required],
            users: [[], Validators.required],
        });
    }
    setProfile(user: any) {
        this.registerForm.controls['firstName'].setValue(user.firstName);
        this.registerForm.controls['lastName'].setValue(user.lastName);
        let i = this.countryList.findIndex(x => x.name == user.countryName);
        let obj = this.countryList.find(x => x.name == user.countryName);
        this.registerForm.controls['countryName'].setValue(i);
        this.selectedCountry = this.countryList[i];
        this.registerForm.controls['alpha2code'].setValue(user.alpha2code);
        this.registerForm.controls['phone'].setValue(user.phone);
        this.registerForm.controls['callingCode'].setValue(user.callingCode);
        this.registerForm.controls['currency'].setValue(user.currency);
        this.registerForm.controls['timezone'].setValue(user.timezone);
        this.registerForm.controls['flag'].setValue(user.flag);
    }
    onSubmitForm() {
        this.submitted = true;
        if (this.registerForm.valid) {
            let reqData = Object.assign({}, this.registerForm.value)
            reqData.countryName = this.countryList[reqData.countryName].name;
            reqData.token = this.token || '';
            this.chatService.createUser(reqData, (token: any) => {
                this.user = reqData;
                this.chatService.set('user', this.user);
                localStorage.setItem("userToken", token);
                this.token=token;
                this.submitted = false;
                this.chatService.socket.emit('getUsersList',this.token);
                this.resetForm();
            }, (e: any) => {
                this.submitted = false;
            })
        }
    }
    selectCountry(index: number) {
        if (index && index > -1) {
            this.selectedCountry = this.countryList[index];
            this.registerForm.controls['alpha2code'].setValue(this.countryList[index].alpha2Code);
            this.registerForm.controls['flag'].setValue(this.countryList[index].flag);
            this.registerForm.updateValueAndValidity();
        }

    }
    resetForm() {
        this.submitted = false;
        this.registerForm.reset();
        jQuery('#profileModal').modal('hide');

    }
    openProfile() {
        if (this.user) {
            this.setProfile(this.user)
        }
        jQuery('#profileModal').modal('show');

    }
    openCreateGropModal(){
        jQuery('#createGroupModal').modal('show');
    }
    resetGroupForm(){
        this.submittedGroupForm = false;
        this.newGroupForm.reset();
        jQuery('#createGroupModal').modal('hide');

    }
    onSubmitGruopForm(){
        this.submittedGroupForm = true;
        console.log("----------->>>",this.newGroupForm.value)
        if(this.newGroupForm.valid){
            this.groups.push(this.newGroupForm.value);
            this.submittedGroupForm = false;
            this.resetGroupForm();
        }

    }
}
