import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Provider } from '../models/Provider';
import { ProviderServiceService } from '../services/providerService/provider-service.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  providers: Provider[]=[] ;
  showForm = false;
  isEditing = false;
  provider: Provider={
    id: 0,
    name: '',
    email: '',
    phone: 0,
    city: ''
  }

  constructor(private providerService :ProviderServiceService) { }

  ngOnInit(): void {
    this.getAllProvider();
  }


  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire

  }

  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();

  }
  toggleEditing(id:number) {
    this.isEditing = !this.isEditing;
  }

  getAllProvider (){
    this.providerService.getAllProviders().subscribe(
      (result) => {
        this.providers = result;
        console.log(this.providers);
      },
      (error) => {
        console.error('Error fetching providers:', error);
      }
    );

  }

  addProvider(addForm: NgForm) {
    if (addForm.valid) {
      // Vérifiez si le formulaire est valide avant d'ajouter le fournisseur
      this.providerService.AddProvider(this.provider).subscribe(
        () => {
          alert('provider is added successfully');
          // Réinitialisez le formulaire après l'ajout si nécessaire
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add provider:', error);
        }
      );
    }
  }



  UpdateProvider(provider: Provider) {
    this.providerService.UpdateProvider(provider).subscribe(
      () => {
        alert('successful update.');

      },
      (error) => {
        console.error('Error update provider:', error);

      }
    );
  }

  DeleteProvider(idProvider: number) {
    this.providerService.DeleteProvider(idProvider).subscribe(
      () => {
        alert("provider"+idProvider +"is deleted  successfully");

        // La suppression a réussi, mettez à jour la liste des fournisseurs

        this.providerService.getAllProviders();
        console.log(this.providers)
      },
      (error) => {
        console.error('Error Delete provider:', error);
      }
    );
  }



 editingProvider: Provider | null = null; // Ajoutez cette ligne



  setEditingProvider(provider: Provider | null) {
    this.editingProvider = provider;
  }


}
