import { Component, Input, OnInit } from '@angular/core';
import { Folder } from '../model/folder';
import { FolderService } from '../service/folder.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  folderList: Folder[] = [];
  @Input() folder: Folder = new Folder();

  constructor(
    private folderService: FolderService,
    private location: Location
    ) { }

  ngOnInit() {
    this.folder = new Folder();
    this.getFolders();
  }

  goBack(): void {
    this.location.back();
  }

  getFolders(): void {
    this.folderService.getFolders().subscribe(folders => this.folderList = folders);
  }

  saveFolder(): void {
    this.folderService.saveFolder(this.folder).subscribe(folder => { this.folderList.push(folder); });

    this.folder.folderDescription = '';
  }

  updateFolder(folder: Folder): void {
    this.folderService.updateFolder(folder).subscribe();
  }

  delete(folder: Folder): void {
    this.folderList = this.folderList.filter(f => f !== folder);
    this.folderService.deleteFolder(folder).subscribe();
  }

}
