using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Customer;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> GetAll()
        {
            var customers = await _context.Customers.ToListAsync();

            var customerDtos = customers.Select(c => c.ToCustomerDto()).ToList();

            return Ok(customerDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var customerEntity = await _context.Customers.FindAsync(id);

            if (customerEntity is null) // Kan skrivas "return customer is not null ? Ok(customer) : NotFound();"
            {
                return NotFound();
            }

            return Ok(customerEntity.ToCustomerDto());
        }

        [HttpPost]

        public async Task<IActionResult> Create(CreateCustomerDto createDto)
        {
            var customerEntity = createDto.ToCustomerFromCreateDto();

            await _context.Customers.AddAsync(customerEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = customerEntity.Id }, customerEntity.ToCustomerDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCustomerDto updateDto)
        {
            var customerEntity = await _context.Customers.FindAsync(id);

            if (customerEntity is null)
            {
                return NotFound();
            }

            customerEntity.UpdateFromDto(updateDto);
            await _context.SaveChangesAsync();

            return Ok(customerEntity.ToCustomerDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customerEntity = await _context.Customers.FindAsync(id);

            if (customerEntity is null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customerEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}