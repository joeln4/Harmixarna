using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Treatment
{
    public class UpdateTreatmentDto
    {
        public required string Type { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public int Duration { get; set; }
    }
}