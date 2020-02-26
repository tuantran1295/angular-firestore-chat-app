import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
  ) { }

  getUserProfile(userId) {
    return this.afs
    .collection<any>('users')
    .doc(userId)
    .valueChanges();
  }
}
