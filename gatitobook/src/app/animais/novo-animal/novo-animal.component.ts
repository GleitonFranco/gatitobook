import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimaisService} from "../animais.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {
  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(private animalService: AnimaisService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    const allowComments = this.formularioAnimal.get('allowComments')?.value ?? false;
    const description = this.formularioAnimal.get('description')?.value ?? '';
    this.animalService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['animais'])))
      .subscribe((ev: HttpEvent<any>) => {
        if (ev.type == HttpEventType.UploadProgress) {
          const total = ev.total ?? 1;
          this.percentualConcluido = Math.round(100 * (ev.loaded / total));
        }
      },
        (erro) => console.log(erro)
      );
  }

  gravarArquivo(arquivo: any): void {
    // const file = arquivo?.files[0];
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
