using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Customer
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public required string Name { get; set; } 
        public required string Email { get; set; }
        public string? Phone { get; set; }
        // public required string Password { get; set; } 
        public bool IsAdmin { get; set; }
    }
}