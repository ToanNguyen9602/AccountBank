using AutoMapper;
using FinalTestApi.Models;
using Lombok.NET;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace FinalTestApi.Services
{
    [RequiredArgsConstructor]
    public partial class BankServiceImpl : BankService

    {
        private readonly AccountBankContext db;
        private readonly IMapper mapper;

        public async Task<bool> Transaction(TransactionDetailDto trans)
        {
            var acc = await db.Accounts.FindAsync(trans.AccId);
            if (trans.TransType == 1)
            {
                acc.Balance += trans.TransMoney;
            } else
            {
                acc.Balance -= trans.TransMoney;
            }
            db.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            var newTrans = new TransactionDetail() 
                {
                   AccId = trans.AccId,
                   TransMoney = trans.TransMoney,
                   TransType = trans.TransType,
                   DateOfTrans = trans.DateOfTrans,
                   Acc = acc
                };
            await db.TransactionDetails.AddAsync(newTrans);
            return await db.SaveChangesAsync() > 0;

        }

        public async Task<bool> IsAccExist(int accId)
        {
            var acc = await db.Accounts.FindAsync(accId);
            if (acc != null)
            {
                return true;
            } else
            {
                return false;
            }
        }

        public async Task<bool> CheckBalance(double balance, int AccId)
        {
            var acc = await db.Accounts.FindAsync(AccId);
            return  (acc.Balance >=  balance) ? true : false;
        }

        public async Task<bool> UpdateUser(AccountDto account)
        {

            var acc = await db.Accounts.FindAsync(account.AccId);
            acc.CustomerName = account.CustomerName;
            acc.Email = account.Email;
            acc.Phone = account.Phone;
            db.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return await db.SaveChangesAsync() > 0;
        }

        public async Task<List<TransactionDetailDto>> GetTransactions(int accId, int transType)
        {
            var listTrans = await db.TransactionDetails.Where(t => t.AccId == accId && t.TransType == transType).ToListAsync();
            return mapper.Map<List<TransactionDetailDto>>(listTrans);
        }

        public async Task<List<TransactionDetailDto>> SearchBetween(int accId, DateTime[] date)
        {
            var acc = await db.Accounts.FindAsync(accId);
            var listTrans = acc.TransactionDetails.Where(trans => trans.DateOfTrans >= date[0] && trans.DateOfTrans <= date[1]).ToList();
            return mapper.Map<List<TransactionDetailDto>>(listTrans);
        }

        public async Task<AccountDto> GetAccount(int accId)
        {
            var acc = await db.Accounts.FindAsync(accId);
            return mapper.Map<AccountDto>(acc);
        }
    }
}
