using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Booking
{
    public class BookingDto //skall nog utökas eller ändras, lägga till summa för bokningen? Använd för att visa "kvittot" efter beställning är gjord
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public BookingStatus Status { get; set; }
    };

};