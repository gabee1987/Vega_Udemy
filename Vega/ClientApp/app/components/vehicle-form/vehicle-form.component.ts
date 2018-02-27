import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

    constructor(
        private vehicleService: VehicleService) { }
        makes: any[];
        models: any[];
        vehicle: any = {};
        features: any[];
    

        ngOnInit() {
            this.vehicleService.GetMakes().subscribe(makes =>
                this.makes = makes
                //console.log("MAKES", this.makes);
            );
            this.vehicleService.GetFeatures().subscribe(features =>
                this.features = features);
        }

        onMakeChange() {
            //console.log("VEHICLE", this.vehicle);
            var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
            this.models = selectedMake ? selectedMake.models : [];
            delete this.vehicle.modelId;
        }
    

    

}
