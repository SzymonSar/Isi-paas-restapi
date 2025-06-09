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


}
