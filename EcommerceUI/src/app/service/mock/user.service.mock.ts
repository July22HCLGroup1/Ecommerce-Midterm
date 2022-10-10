import { Observable, of } from "rxjs";
import { UpdateImageDTO } from "src/app/UpdateImageDTO";
import { User } from "src/app/user";
import { UserService } from "../user.service";

export class UserServiceMock extends UserService {
    user: User = {
        userId: 0,
        userName: "testname",
        password: "testpassword",
        firstName: "testfirst",
        lastName: "testlast",
        email: "test@email.com",
        profileImage: "",
        roles: [
            { roleName: "ADMIN" },
            { roleName: "USER" }
        ]
    }


    public login(loginData: any): Observable<Object> {
        return of(User);
    }
    /*
    public roleMatch(allowedRoles: any): boolean {
        
    }
    public getAllUsers(): Observable<any> {
        
    }
    public getCurrentUser(): Observable<any> {
        
    }
    public getUserById(id: number): Observable<any> {
        
    }
    public updatePassword(passwordDTO: any): Observable<any> {
        
    }
    public deleteCurrentUser(): Observable<any> {
        
    }
    public updateUserImage(updateImageDTO: UpdateImageDTO): Observable<any> {
        
    }
    */
}