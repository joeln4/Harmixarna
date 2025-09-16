using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking;
using api.Dtos.Customer;
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
                TreatmentIds = bookingEntity.Treatments.Select(t => t.Id).ToList(),
                Message = bookingEntity.Message,
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