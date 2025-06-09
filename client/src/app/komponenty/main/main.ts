import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit{
  ngOnInit(): void {
    this.AxiosGet();
  }
  bazaurl = "https://isi-paas-restapi-serwer.onrender.com/"
  danein: any[] = []
  nazwa: string = "";
  cena: number = 0.0;
  ilosc: number = 0;
  Aid: number = 0;
  Anazwa: string = "";
  Acena: number = 0.0;
  Ailosc: number = 0;
  AxiosGet = async () => {
    let client = axios.create({
      baseURL: this.bazaurl
    });
    try {
      const response = await client.get(`/get-db/`);
      this.danein = response.data
      console.log(response.data)
    } catch (error) {
      console.log("error", error);
    }
  }

  AxiosPost = async () => {
    let client = axios.create({
      baseURL: this.bazaurl
    });
    const dane = {
      nazwa: this.nazwa,
      cena: this.cena,
      ilosc: this.ilosc
    }
    try {
      console.log(dane)
      const response = await client.post(`/add-db`, dane, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.status)
    } catch (error) {
      console.log("error", error);
    }
  }


  AxiosPut = async () => {
    let client = axios.create({
      baseURL: this.bazaurl
    });
    const dane = {
      nazwa: this.Anazwa,
      cena: this.Acena,
      ilosc: this.Ailosc
    }
    try {
      console.log(dane)
      const response = await client.put(`/update-db?id=${this.Aid}`, dane, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.status)
    } catch (error) {
      console.log("error", error);
    }
  }


     AxiosDelete = async (id: number) => {
    let client = axios.create({
      baseURL: this.bazaurl
    });
    try {
      const response = await client.delete(`/del-db?id=${id}`);
    console.log(response.status)
    } catch (error) {
      console.log("error", error);
    }
  }

  async Dodaj(){
    console.log("dodaj dodaje")
    if(this.nazwa != "" && this.cena != 0.0 && this.ilosc != 0)
      {
      await this.AxiosPost()
    }
    this.AxiosGet()
  }

    async Usun( id: number){
    console.log("usun usuwa")
    if(id)
      {
      await this.AxiosDelete(id)
    }
    this.AxiosGet()
  }

  async Aktualizuj(){
    console.log("aktualizuj aktualizuje")
    if(this.Aid != null && this.Anazwa != "" && this.Acena != 0.0 && this.Ailosc != null)
      {
      await this.AxiosPut()
    }
    this.AxiosGet()
  }

  async Uzupelnij(){
    
    this.Anazwa = this.danein.find(item => item.id === this.Aid)?.nazwa
    this.Acena = this.danein.find(item => item.id === this.Aid)?.cena
    this.Ailosc = this.danein.find(item => item.id === this.Aid)?.ilosc

    this.danein.sort((a, b) => a.id - b.id);
  }

}
