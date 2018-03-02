import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import { SaveVehicle, Vehicle } from '../../models/vehicle';
//import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private toastyService: ToastyService) {

        route.params.subscribe(p => {
            this.vehicle.id = +p['id']; // Convert to number with + sign
        });
    }

        makes: any[];
        models: any[];
        features: any[];
        vehicle: SaveVehicle = {
            id: 0,
            makeId: 0,
            modelId: 0,
            isRegistered: false,
            features: [],
            contact: {
                name: '',
                email: '',
                phone: ''}
        };
    

        ngOnInit() {
            var sources = [
                this.vehicleService.GetMakes(),
                this.vehicleService.GetFeatures(),
            ];
            if (this.vehicle.id) { // Checks if id is exist to make it compatible with vehicle creating
                sources.push(this.vehicleService.getVehicle(this.vehicle.id));
            }

            Observable.forkJoin(sources).subscribe(data => {
                this.makes = data[0];
                this.features = data[1];
                if (this.vehicle.id) {
                    this.setVehicle(data[2]);
                }
                }, err => {
                    if (err.status == 404) {
                        this.router.navigate(['/home']); // Here should create a 404 not found html page for this error
                    }
                }
            );


            //this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
            //    this.vehicle = v;
            //}, err => {
            //    if (err.status == 404) {
            //        this.router.navigate(['/home']); // Here should create a 404 not found html page for this error
            //    }
            //});

            //this.vehicleService.GetMakes().subscribe(makes =>
            //    this.makes = makes
                //console.log("MAKES", this.makes);
            //);

            //this.vehicleService.GetFeatures().subscribe(features =>
            //    this.features = features);
        }

        private setVehicle(v: Vehicle) {
            this.vehicle.id = v.id;
            this.vehicle.makeId = v.make.id;
            this.vehicle.modelId = v.model.id;
            this.vehicle.isRegistered = v.isRegistered;
            this.vehicle.contact = v.contact;
            //this.vehicle.features = 
        }
        
        onMakeChange() {
            //console.log("VEHICLE", this.vehicle);
            var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
            this.models = selectedMake ? selectedMake.models : [];
            delete this.vehicle.modelId;
        }

        onFeatureToggle(featureId, $event) {
            if ($event.target.checked)
                this.vehicle.features.push(featureId);
            else {
                var index = this.vehicle.features.indexOf(featureId);
                this.vehicle.features.splice(index, 1);
            }
        }
    
        submit() {
            this.vehicleService.create(this.vehicle)
                .subscribe(
                x => console.log(x)
                    // Simple toasty error notify
                    //err => {
                        //this.toastyService.error({
                        //    title: 'Error',
                        //    msg: 'An unexpected error happened.',
                        //    theme: 'bootstrap',
                        //    showClose: true,
                        //    timeout: 5000
                        //});
                    //}
                );
        }
    

}
