using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Treatment;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll()
        {
            var treatments = _context.Treatments.ToList().Select(t => t.ToTreatmentDto());

            return Ok(treatments);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var treatmentEntity = _context.Treatments.Find(id);
            if (treatmentEntity is null)
            {
                return NotFound();
            }

            return Ok(treatmentEntity.ToTreatmentDto());
        }

        [HttpPost]
        public IActionResult Create(CreateTreatmentDto createDto)
        {
            var treatmentEntity = createDto.ToTreatmentFromCreateDto();
            _context.Treatments.Add(treatmentEntity);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = treatmentEntity.Id }, treatmentEntity.ToTreatmentDto());
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateTreatmentDto updateDto)
        {
            var treatmentEntity = _context.Treatments.Find(id);

            if (treatmentEntity is null)
            {
                return NotFound();
            }

            treatmentEntity.UpdateFromDto(updateDto);
            _context.SaveChanges();

            return Ok(treatmentEntity.ToTreatmentDto());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var treatmentEntity = _context.Treatments.Find(id);

            if (treatmentEntity is null)
            {
                return NotFound();
            }

            _context.Treatments.Remove(treatmentEntity);
            _context.SaveChanges();

            return NoContent();
        }
    }
}