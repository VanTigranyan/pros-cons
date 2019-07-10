import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { ApiEndpoints } from "../data-layer/constants/api.endpoints";
import { BaseUrl } from "../environments/environment";
import { GetUserIdResponse, GetGroupIdResponse } from "../data-layer/models/api.models";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _userId: string;
  private _groupId: string;

  constructor(
    private http: HttpClient,
  ) {
  }

  private _fetchUserId(): Observable<string> {
    return this.http.get<GetUserIdResponse>(BaseUrl + ApiEndpoints.GetUserId).pipe(
      map((res: GetUserIdResponse) => {
        this._userId = res.userId;
        return res.userId;
      })
    );
  }

  private _fetchGroupId(): Observable<string> {
    return this.http.get<GetGroupIdResponse>(BaseUrl + ApiEndpoints.GetGroupId).pipe(
      map((res: GetGroupIdResponse) => {
        this._groupId = res.groupId;
        return res.groupId;
      })
    );
  }

  public getUserId(): Observable<string> {
    return this._userId ? of(this._userId) : this._fetchUserId();
  }

  public getGroupId(): Observable<string> {
    return this._groupId ? of(this._groupId) : this._fetchGroupId();
  }
}
