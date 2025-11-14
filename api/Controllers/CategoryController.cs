using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Category;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();

            var categoryDtos = categories.Select(c => c.ToCategoryDto()).ToList();

            return Ok(categoryDtos);

        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var categoryEntity = await _context.Categories.FindAsync(id);

            if (categoryEntity is null)
            {
                return NotFound();
            }

            return Ok(categoryEntity.ToCategoryDto());
        }

        [HttpPost]

        public async Task<IActionResult> Create(CreateCategoryDto dto)
        {
            var categoryEntity = dto.ToCategoryFromCreateDto();

            await _context.Categories.AddAsync(categoryEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = categoryEntity.Id }, categoryEntity.ToCategoryDto());
        }
    }
}