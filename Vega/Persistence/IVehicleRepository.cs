using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Persistence
{
    public interface IVehicleRepository
    {
        void AddVehicle(Vehicle vehicle);
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<Vehicle> GetVehicleWithMake(int id);
        void RemoveVehicle(Vehicle vehicle);
    }
}