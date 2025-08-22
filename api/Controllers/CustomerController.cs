using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Customer;
using api.Mappers;
using api.Models;
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
            var customerEntity = _context.Customers.Find(id);

            if (customerEntity is null) // Kan skrivas "return customer is not null ? Ok(customer) : NotFound();"
            {
                return NotFound();
            }

            return Ok(customerEntity.ToCustomerDto());
        }

        [HttpPost]

        public IActionResult Create(CreateCustomerDto createDto)
        {
            var customerEntity = createDto.ToCustomerFromCreateDto();
            _context.Customers.Add(customerEntity);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = customerEntity.Id }, customerEntity.ToCustomerDto());
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateCustomerDto updateDto)
        {
            var customerEntity = _context.Customers.Find(id);

            if (customerEntity is null)
            {
                return NotFound();
            }

            customerEntity.UpdateFromDto(updateDto);
            _context.SaveChanges();

            return Ok(customerEntity.ToCustomerDto());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var customerEntity = _context.Customers.Find(id);

            if (customerEntity is null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customerEntity);
            _context.SaveChanges();

            return NoContent();
        }
    }

}