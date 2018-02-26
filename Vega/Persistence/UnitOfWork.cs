using Vega.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Vega.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegalDbContext context;

        public UnitOfWork(VegalDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
