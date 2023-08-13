using System;
using System.Collections.Generic;

namespace FinalTestApi.Models;

public partial class AccountDto
{
    public int AccId { get; set; }

    public string CustomerName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public double Balance { get; set; }

  
}
