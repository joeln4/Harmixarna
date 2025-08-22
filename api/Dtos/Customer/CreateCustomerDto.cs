using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Customer
{
    public class CreateCustomerDto
    {
        public required string Name { get; set; } 
        public required string Email { get; set; }
        public string? Phone { get; set; }
        public required string Password { get; set; } // Skapas med identity?
        public bool IsAdmin { get; set; }
    }
}