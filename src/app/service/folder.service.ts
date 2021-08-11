import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Folder } from '../model/folder';

@Injectable({ providedIn: 'root'})
export class FolderService {

  private folderUrl = 'http://localhost:8080/folders';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.folderUrl).pipe();
  }

  getFolderById(idFolder: number): Observable<Folder> {
    const url = `${this.folderUrl}/${idFolder}`;

    return this.http.get<Folder>(url).pipe();
  }

  saveFolder(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(this.folderUrl, folder, this.httpOptions).pipe();
  }

  updateFolder(folder: Folder): Observable<Folder> {
    return this.http.put<Folder>(this.folderUrl, folder, this.httpOptions).pipe();
  }

  deleteFolder(folder: Folder | number): Observable<Folder> {
    const idFolder = typeof folder === 'number' ? folder : folder.idFolder;
    const url = `${this.folderUrl}/${idFolder}`;

    return this.http.delete<Folder>(url, this.httpOptions).pipe();
  }
}
