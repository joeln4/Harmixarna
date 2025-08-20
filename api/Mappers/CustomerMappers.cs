using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Customer;
using api.Models;

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
    }
}

 