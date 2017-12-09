import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable()

export class AuthService {
    constructor(private http:Http) {}
    login(loginData) {
        return this.http.post('http://localhost:3000/users',loginData)
            .map((res:Response) => res.json())
    }
}