using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Dtos.Treatment
{
    public class TreatmentDto
    {
        public int Id { get; set; }
        public required string Type { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; }
    }
}