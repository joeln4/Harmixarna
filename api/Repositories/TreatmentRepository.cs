using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class TreatmentRepository : ITreatmentRepository
    {
        public readonly ApplicationDBContext _context;
        public TreatmentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public Task<List<Treatment>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}