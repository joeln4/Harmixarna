using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public BookingController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var bookings = _context.Bookings.ToList().Select(b => b.ToBookingDto());

            return Ok(bookings);
        }

        [HttpGet("{id}")]

        public IActionResult GetById(int id)
        {
            var bookingEntity = _context.Bookings.Find(id);

            if (bookingEntity is null)
            {
                return NotFound();
            }

            return Ok(bookingEntity.ToBookingDto());
        }
    }
}