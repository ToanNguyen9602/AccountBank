using FinalTestApi.Models;

namespace FinalTestApi.Services
{
    public interface BankService
    {
        public Task<bool> IsAccExist(int accId);

        public Task<bool> Transaction(TransactionDetailDto trans);

        public Task<bool> CheckBalance(double balance, int AccId);

        public Task<bool> UpdateUser(AccountDto account);
        public Task<List<TransactionDetailDto>> GetTransactions(int accId, int transType);

        public Task<List<TransactionDetailDto>> SearchBetween(int accId, DateTime[] date);

        public Task<AccountDto> GetAccount(int accId);
    }
}
