import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { ProsAndCons } from "../data-layer/models/decision.models";
import { BaseUrl } from "../environments/environment";
import { ApiEndpoints } from "../data-layer/constants/api.endpoints";
import { AppService } from "./app.service";

@Injectable({
  providedIn: "root"
})
export class DecisionService {
  constructor(
    private http: HttpClient,
    private userService: AppService,
  ) {
    userService.getUserId().subscribe((id) => {
      this._userId = id;
    });
    userService.getGroupId().subscribe((id) => {
      this._groupId = id;
    });
  }

  private _userId: string;
  private _groupId: string;
  private readonly _pros = new BehaviorSubject<string[]>([]);
  private readonly _cons = new BehaviorSubject<string[]>([]);
  private readonly _isPending = new BehaviorSubject<boolean>(false);
  public readonly pros$ = this._pros.asObservable();
  public readonly cons$ = this._cons.asObservable();
  public readonly isPending$ = this._isPending.asObservable();

  private get pros(): string[] {
    return this._pros.getValue();
  }
  private get cons(): string[] {
    return this._cons.getValue();
  }
  private get isPending(): boolean {
    return this._isPending.getValue();
  }
  private set isPending(val: boolean) {
    this._isPending.next(val);
  }
  private set pros(val: string[]) {
    this.isPending = true;
    this.sendProsAndCons({
      pros: this.pros,
      cons: this.cons,
    }).subscribe((r) => {
      this.isPending = false;
      if (r) {
        this._pros.next(val);
      }
    });
  }
  private set cons(val: string[]) {
    this.isPending = true;
    this.sendProsAndCons({
      pros: this.pros,
      cons: this.cons,
    }).subscribe((r) => {
      this.isPending = false;
      if (r) {
        this._cons.next(val);
      }
    });
    this._cons.next(val);
  }

  public getPros() {
    return this.pros;
  }
  public getCons() {
    return this.cons;
  }

  public addPro(val: string) {
    this.pros = [
      ...this.pros,
      val,
    ]
  }
  public addCon(val: string) {
    this.cons = [
      ...this.cons,
      val,
    ]
  }

  public removePro(idx: number) {
    this.pros = this.pros.filter((item, i) => i !== idx);
  }
  public removeCon(idx: number) {
    this.cons = this.cons.filter((item, i) => i !== idx);
  }

  public updatePro(idx: number, val: string) {
    this.pros = this.pros.map((item, i) => {
      if (i === idx) {
        return val;
      }
      return item;
    })
  }

  public updateCon(idx: number, val:string) {
    this.cons = this.cons.map((item, i) => {
      if (i === idx) {
        return val;
      }
      return item;
    })
  }

  public fetchProsAndCons(): Observable<ProsAndCons> {
    return this.http.get<ProsAndCons>(`${BaseUrl}${ApiEndpoints.GetList}${this._groupId}/user/${this._userId}`).pipe(
      tap((res: ProsAndCons) => {
        this.pros = res.pros;
      })
    );
  }

  public sendProsAndCons(pac: ProsAndCons):Observable<any> {
    return this.http.put(`${BaseUrl}${ApiEndpoints.PutList}${this._groupId}/user/${this._userId}`, pac);
  }
}
