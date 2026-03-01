using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToCategoryDto(this Category categoryEntity)
        {
            return new CategoryDto
            {
                Id = categoryEntity.Id,
                Name = categoryEntity.Name
            };
        }

        public static Category ToCategoryFromCreateDto(this CreateCategoryDto createDto)
        {
            return new Category
            {
                Name = createDto.Name
            };
        }
    }
}