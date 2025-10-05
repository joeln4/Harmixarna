using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Treatment
{
    public class CreateTreatmentDto
    {
        public required string Type { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; }
    }
}