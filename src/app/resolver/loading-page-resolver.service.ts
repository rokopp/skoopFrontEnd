import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {LoadingScreenService} from '../services/loading-screen.service';

@Injectable()
export class LoadingPageResolver implements Resolve<any> {
  constructor(
    private loadingScreenService: LoadingScreenService
  ) { }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3500);
    });
  }
}
