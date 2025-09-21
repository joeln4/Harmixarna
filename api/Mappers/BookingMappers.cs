using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking;
using api.Dtos.Customer;
using api.Dtos.Treatment;
using api.Models;

namespace api.Mappers
{
    public static class BookingMappers
    {
        public static BookingDto ToBookingDto(this Booking bookingEntity)
        {
            
            return new BookingDto
            {
                Id = bookingEntity.Id,
                StartTime = bookingEntity.StartTime,
                EndTime = bookingEntity.EndTime,
                Status = bookingEntity.Status,
                Message = bookingEntity.Message,
                Treatments = bookingEntity.Treatments.Select(t => new TreatmentDto
                {
                    Id = t.Id,
                    Type = t.Type,
                    Price = t.Price,
                    Description = t.Description,
                    Duration = t.Duration

                }).ToList(),
                Customer = new CustomerInfoDto
                {
                    Name = bookingEntity.Customer.Name,
                    Email = bookingEntity.Customer.Email,
                    Phone = bookingEntity.Customer.Phone
                }
            };
        }
    }
}