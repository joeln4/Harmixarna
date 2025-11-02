using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Customer;
using api.Dtos.Treatment;
using api.Models;


namespace api.Dtos.Booking
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public BookingStatus Status { get; set; }
        public string? Message { get; set; }
        public int Price { get; set; }
        public List<TreatmentDto> Treatments { get; set; } = new();
        public CustomerInfoDto Customer { get; set; } = default!;

    };

};