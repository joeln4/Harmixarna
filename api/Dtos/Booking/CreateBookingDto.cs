using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Customer;

namespace api.Dtos.Booking
{
  public class CreateBookingDto //tar in användarens val i frontend och backend sökter konverteringen av datatyperna för fälten.
  {
    public string Date { get; set; } = default!; // ("yyyy-MM-dd") är datumet som väljs i kalendern i frontend. Är string för att frontend inte ska ansvara för konverteringen.
    public string StartTime { get; set; } = default!; // ("HH:mm") är tiden som väljs i frontend. String, samma förklaring som ovan.
    public List<int> Treatments { get; set; } = new();
    public string? Message { get; set; }
    public CustomerInfoDto Customer { get; set; } = default!; // Tar med det som behövs från kunden.
    };
};