using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking;

namespace api.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<string>> GetAvailableTimes(AvailableTimesRequestDto dto);
    }
}