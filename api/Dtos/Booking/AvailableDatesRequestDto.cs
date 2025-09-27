using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class AvailableDatesRequestDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public List<int> Ids { get; set; } = new();

    }
}