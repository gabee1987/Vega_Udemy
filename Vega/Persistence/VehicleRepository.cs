using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Persistence
{
    // A collection of Domain objects in memory
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegalDbContext context;

        public VehicleRepository(VegalDbContext context)
        {
            this.context = context;
        }

        public void AddVehicle(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Vehicles.FindAsync(id);
            }
            
            return await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<Vehicle> GetVehicleWithMake(int id)
        {
            return await context.Vehicles
                   .Include(v => v.Model)
                       .ThenInclude(m => m.Make)
                   .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void RemoveVehicle(Vehicle vehicle)
        {
            context.Vehicles.Remove(vehicle);
        }
    }
}
