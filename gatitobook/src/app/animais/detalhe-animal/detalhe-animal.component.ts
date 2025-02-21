import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Animal} from "../animais";
import {AnimaisService} from "../animais.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {
  animalID!: number;
  animal$!: Observable<Animal>;

  constructor(private animaisService: AnimaisService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.animalID = this.activatedRoute.snapshot.params['animalId'];
    this.animal$ = this.animaisService.buscarPorID(this.animalID);
  }

  curtir() {
    this.animaisService.curtir(this.animalID).subscribe((curtiu) => {
      if (curtiu) {
        this.animal$ = this.animaisService.buscarPorID(this.animalID);
      }
    })
  }

  excluir() {
    this.animaisService.excluiAnimal(this.animalID).subscribe(() => {
      this.router.navigate(['/animais/']);
    },
      (erro) => console.log(erro)
    );
  }
}
