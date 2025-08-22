using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Customer;
using api.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace api.Mappers
{
    public static class CustomerMappers
    {
        public static CustomerDto ToCustomerDto(this Customer customerEntity)
        {
            return new CustomerDto
            {
                Id = customerEntity.Id,
                Name = customerEntity.Name,
                Email = customerEntity.Email,
                Phone = customerEntity.Phone,
                IsAdmin = customerEntity.IsAdmin

            };
        }

        public static Customer ToCustomerFromCreateDto(this CreateCustomerDto createDto)
        {
            return new Customer
            {
                Name = createDto.Name,
                Email = createDto.Email,
                Phone = createDto.Phone,
                Password = createDto.Password,
                IsAdmin = createDto.IsAdmin
            };
        }

        public static void UpdateFromDto(this Customer customerEntity, UpdateCustomerDto updateDto)
        {
            {
                customerEntity.Name = updateDto.Name;
                customerEntity.Email = updateDto.Email;
                customerEntity.Phone = updateDto.Phone;
                customerEntity.Password = updateDto.Password;
            };
        }
    }
}

 