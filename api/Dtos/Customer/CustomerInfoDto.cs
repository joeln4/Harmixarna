using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Customer
{
  public class CustomerInfoDto // För att kunna göra en bokning utan att riktiga kunder ska finnas till en början.
  {
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string? Phone { get; set; }
      
  };
};