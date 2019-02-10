import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

export type InternalStateType = {
    [key: string]: any
};

@Injectable()
export class ChatService {
    private url = 'http://localhost:3000';
    public socket: any;
    public users: Array<any>;
    _state: InternalStateType = {};

    constructor() {
        this.socket = io(this.url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });
    }
    private _clone(object: InternalStateType) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    }
    get state() {
        return this._state = this._clone(this._state);
    }

    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }

    get(prop?: any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : null;
    }

    set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }


    public sendMessage(message: any) {
        this.socket.emit('new-message', message);
    }
    getUser(token: any, successCB: any, errorCB: any) {
        this.socket.on('usersList', (users: any) => {
            this.set('users', users)
        });
        this.socket.emit('fetchUser', token);
        this.socket.on('getUser', (user: any) => {
            successCB(user)
        });
        this.socket.on('error', (e: any) => {
            errorCB(e)
        });

    }
    getUsers(successCB: any, errorCB: any) {
        this.socket.on('usersList', (count: any) => {
            successCB(count)
        });
        this.socket.on('error', (e: any) => {
            errorCB(e)
        });

    }
    createUser(data: any, successCB: any, errorCB: any) {
        this.socket.emit('createUser', data);
        this.socket.on('userCreated', (data: any) => {
            successCB(data)
        });
        this.socket.on('error', (e: any) => {
            errorCB(e)
        });

    }

}