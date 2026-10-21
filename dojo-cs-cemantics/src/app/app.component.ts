import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ApiClientService} from "./service/api-client.service";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, InputTextModule, Button, ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiClientService]
})
export class AppComponent {
  private apiClient = inject(ApiClientService);

  myGuess: string = "";
  hasError = false;
  myResultDistance = 0

  // sendMyGuess() {
  //   this.myResultDistance = 45
  //   this.apiClient.getPokemonValue({
  //     value: this.myGuess
  //   }).pipe(
  //     catchError(err => {
  //       this.myResultDistance = 0
  //       this.hasError = true;
  //       return EMPTY
  //     })
  //   ).subscribe(result=> {
  //     this.hasError = false;
  //     this.myResultDistance = result.value
  //   });
  // }

  sendMyGuess() {
    this.apiClient.getSimilarity({
      value: this.myGuess.trim()
    }).pipe(
      catchError(err => {
        this.myResultDistance = 0
        this.hasError = true;
        return EMPTY
      })
    ).subscribe(result=> {
      this.hasError = false;
      // Similarité word2vec entre -1 et 1 -> pourcentage entre 0 et 100 pour la barre de progression
      this.myResultDistance = Math.max(0, Math.round(result.result * 100))
    });
  }
}
