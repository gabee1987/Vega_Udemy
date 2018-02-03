import { Component, OnInit, Input } from '@angular/core';
import { MakeService } from '../../services/make.service';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

    constructor(
        private makeService: MakeService,
        private featureService: FeatureService) { }
        makes: any[];
        models: any[];
        vehicle: any = {};
        features: any[];
    

        ngOnInit() {
            this.makeService.GetMakes().subscribe(makes =>
                this.makes = makes
                //console.log("MAKES", this.makes);
            );
            this.featureService.GetFeatures().subscribe(features =>
                this.features = features
                //console.log("FEATURES", this.features);
            );
        }

    onMakeChange() {
        //console.log("VEHICLE", this.vehicle);
        var selectedMake = this.makes.find(m => m.id == this.vehicle.make)
        this.models = selectedMake ? selectedMake.models : [];
    }
    

    

}
