using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Models;

namespace Vega.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

            // API Resource to Domain
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                    {
                        // Remove unselected features with normal foreach loop and if statement
                        //var removedFeatures = new List<VehicleFeature>();
                        //foreach (var feature in v.Features)
                        //{
                        //    if (!vr.Features.Contains(feature.FeatureId))
                        //        removedFeatures.Add(feature);
                        //}


                        // Remove unselected features with LinQ
                        var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                        foreach (var feature in removedFeatures)
                        {
                            v.Features.Remove(feature);
                        }



                        // Add new features with normal foreach loop and if statement
                        //foreach (var id in vr.Features)
                        //{
                        //    if (!v.Features.Any(f => f.FeatureId == id))
                        //        v.Features.Add(new VehicleFeature { FeatureId = id });
                        //}


                        // Add new features with LinQ
                        var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });
                        foreach (var feature in addedFeatures)
                        {
                            v.Features.Add(feature);
                        }
                    });
        }
    }
}
