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
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public CustomerController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var customers = _context.Customers.ToList().Select(c => c.ToCustomerDto());

            return Ok(customers);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer is null) // Kan skrivas "return customer is not null ? Ok(customer) : NotFound();"
            {
                return NotFound();
            }

            return Ok(customer.ToCustomerDto());
        }
    }
}