using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Treatment;
using api.Models;
using Humanizer;

namespace api.Mappers
{
    public static class TreatmentMappers
    {
        public static TreatmentDto ToTreatmentDto(this Treatment treatmentEntity)
        {
            return new TreatmentDto
            {
                Id = treatmentEntity.Id,
                Type = treatmentEntity.Type,
                Price = treatmentEntity.Price,
                Description = treatmentEntity.Description,
                Duration = treatmentEntity.Duration

            };
        }

        public static Treatment ToTreatmentFromCreateDto(this CreateTreatmentDto createDto)
        {
            return new Treatment
            {
                Type = createDto.Type,
                Price = createDto.Price,
                Description = createDto.Description,
                Duration = createDto.Duration
            };
        }

        public static void UpdateFromDto(this Treatment treatmentEntity, UpdateTreatmentDto updateDto)
        {
            treatmentEntity.Type = updateDto.Type;
            treatmentEntity.Price = updateDto.Price;
            treatmentEntity.Description = updateDto.Description;
            treatmentEntity.Duration = updateDto.Duration;
        }
    }
}