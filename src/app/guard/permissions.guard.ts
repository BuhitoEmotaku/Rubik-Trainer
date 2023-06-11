import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoguearService } from 'src/app/services/loguear.service';
@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  constructor(private checkLogueado: LoguearService, private router: Router) {

  }

  //Guardia real para comprobar que te has logueado, sino redirige al login
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasUser().then(loggedIn => {
      if (loggedIn) {
        return true;
      } else {
        this.router.navigate(['/inicio']);
        return false;
      }
    });
  }
  //funcion para comprobarlo
  async hasUser(): Promise<boolean> {
    const token = localStorage.getItem('access_token');
    if (token != null) {
      const tokenJSON = {
        token: token
      };
      try {
        const resp = await this.checkLogueado.checkLogueado(tokenJSON).toPromise();
        //console.log(resp);
        return resp === true;
      } catch (error) {
        //console.error(error);
        return false;
      }
    }
    return false;
  }
}
