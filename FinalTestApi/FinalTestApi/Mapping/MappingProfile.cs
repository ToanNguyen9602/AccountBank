using AutoMapper;
using FinalTestApi.Models;

namespace FinalTestApi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TransactionDetail, TransactionDetailDto>(); // Map from Product to ProductEntity
            CreateMap<TransactionDetailDto, TransactionDetail>(); // Map from ProductEntity to Product
            CreateMap<Account, AccountDto>();
            CreateMap<AccountDto, Account>();
        }
    }
}
