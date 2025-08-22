using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking;
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
                DateTime = bookingEntity.DateTime
            };
        }
    }
}