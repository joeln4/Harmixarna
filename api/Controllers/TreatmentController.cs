using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Treatment;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        public readonly ApplicationDBContext _context;

        public TreatmentController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var treatments = await _context.Treatments.ToListAsync();

            var treatmentDtos = treatments.Select(t => t.ToTreatmentDto()).ToList();

            return Ok(treatments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatmentEntity = await _context.Treatments.FindAsync(id);

            if (treatmentEntity is null)
            {
                return NotFound();
            }

            return Ok(treatmentEntity.ToTreatmentDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTreatmentDto createDto)
        {
            var treatmentEntity = createDto.ToTreatmentFromCreateDto();

            await _context.Treatments.AddAsync(treatmentEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = treatmentEntity.Id }, treatmentEntity.ToTreatmentDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateTreatmentDto updateDto)
        {
            var treatmentEntity = await _context.Treatments.FindAsync(id);

            if (treatmentEntity is null)
            {
                return NotFound();
            }

            treatmentEntity.UpdateFromDto(updateDto);
            await _context.SaveChangesAsync();

            return Ok(treatmentEntity.ToTreatmentDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var treatmentEntity = await _context.Treatments.FindAsync(id);

            if (treatmentEntity is null)
            {
                return NotFound();
            }

            _context.Treatments.Remove(treatmentEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}