using FinalTestApi.Models;
using FinalTestApi.Services;
using Lombok.NET;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinalTestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [RequiredArgsConstructor]
    public partial class BankController : ControllerBase
    {   
        private readonly BankService bankService;

        [HttpPost("transaction")]
        public async Task<IActionResult> Transaction([FromBody] TransactionDetailDto transactionDto)
        {
            if (!(await bankService.IsAccExist(transactionDto.AccId)))
            {
                return BadRequest("Account not Found!");
            } else
            {
                if (transactionDto.TransType == 2)
                {
                    if (!(await bankService.CheckBalance(transactionDto.TransMoney, transactionDto.AccId)))
                    {
                        return BadRequest("Balance not enough for withdraw!");
                    }
                }

                if (await (bankService.Transaction(transactionDto)))
                {
                    return Ok(true);
                } else
                {
                    return BadRequest("Transaction Failed!");
                }
            }
        }
        [HttpPut("updateAccount")]
        public async Task<IActionResult> UpdateAccount([FromBody] AccountDto acc)
        {
            if (!(await bankService.IsAccExist(acc.AccId)))
            {
                return BadRequest("Account not Found!");
            }
            else
            {
                if (await (bankService.UpdateUser(acc)))
                {
                    return Ok(true);
                } else
                {
                    return BadRequest("Failed To Update Account Information!");
                }
            }
        }

        [HttpGet("searchTransaction")]
        public async Task<IActionResult> SearchTransaction(int accId, int transtype)
        {
            if (!(await bankService.IsAccExist(accId)))
            {
                return BadRequest("Account not Found!");
            }
            else
            {
                var result = await bankService.GetTransactions(accId, transtype);
                if (result.Count == 0)
                {
                    return NotFound("Doesn't have any Transaction!");
                } else
                {
                    return Ok(result);
                }
            }
        }

        [HttpGet("getAcc")]
        public async Task<IActionResult> GetAccount(int accId)
        {
            if (!(await bankService.IsAccExist(accId)))
            {
                return BadRequest("Account not Found!");
            }
            else
            {
                return Ok(await bankService.GetAccount(accId)); 
            }
        }

        [HttpGet("searchBetween")]
        public async Task<IActionResult> SearchBetween(int accId, string start, string end)
        {
            if (!(await bankService.IsAccExist(accId)))
            {
                return BadRequest("Account not Found!");
            }
            else
            {   
                try
                {
                    DateTime date1 = DateTime.ParseExact(start, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    DateTime date2 = DateTime.ParseExact(end, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    DateTime[] dates = new DateTime[2];
                    dates[0] = date1;
                    dates[1] = date2;

                    var result = await bankService.SearchBetween(accId, dates);
                    if (result.Count == 0)
                    {
                        return NotFound("Not found any Transaction!");
                    }
                    else
                    {
                        return Ok(result);
                    }
                } catch
                {
                    return BadRequest("Date input invalid!");
                }
               
            }
        }
    }
}
