import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  heroes: Hero[];
  @Input() hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.hero = new Hero();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  saveHero(): void {
    this.heroService.saveHero(this.hero).subscribe(hero => { this.heroes.push(hero); });

    this.hero.name = '';
    this.hero.surname = ''
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
