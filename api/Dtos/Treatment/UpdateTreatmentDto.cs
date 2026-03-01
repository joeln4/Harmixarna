using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Models;

namespace api.Dtos.Treatment
{
    public class UpdateTreatmentDto
    {
        public required string Type { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; }
        public int CategoryId {get; set;}
    }
}