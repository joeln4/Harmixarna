using Harmixarna.Data;
using Harmixarna.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Harmixarna.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public AppointmentController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllAppointments()
        {
            var appointments = _dbContext.Appointments.ToList();

            return Ok(appointments);
        }

        [HttpPost]
        public IActionResult CreateAppointment(CreateAppointmentDTO appointment)
        {
            var newAppointment = new Appointment
            {
                CustomerName = appointment.CustomerName,
                CustomerEmail = appointment.CustomerEmail,
                CustomerPhone = appointment.CustomerPhone,
                Date = appointment.Date,
                Service = appointment.Service
            };

            _dbContext.Appointments.Add(newAppointment);
            _dbContext.SaveChanges();

            return Ok(newAppointment);
        }
    }
}
