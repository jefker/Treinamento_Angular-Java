import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContaService } from 'src/app/services/conta.service';
import { Router } from '@angular/router';
import { SaqueDeposito } from 'src/app/interfaces/saque-deposito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {

  constructor(private contaService: ContaService, private router: Router) { }

  ngOnInit(): void {
  }

  formGroup: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });

  sacar() {
    const saque: SaqueDeposito = this.formGroup.value;
    this.contaService.saque(saque).subscribe(contaApi => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Cadastrado com sucesso',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/contas']);
    }, error => {
      console.error(error)
    });


  }
}
