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
        public static CustomerDto ToCustomerDto(this Customer customerModel)
        {
            return new CustomerDto
            {
                Id = customerModel.Id,
                Name = customerModel.Name,
                Email = customerModel.Email,
                Phone = customerModel.Phone,
                IsAdmin = customerModel.IsAdmin

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
    }
}

 