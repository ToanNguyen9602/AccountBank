using FinalTestApi.Models;
using FinalTestApi.Services;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FinalTestApi.Mapping;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AccountBankContext>(
    o => o.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"))
    );

builder.Services.AddScoped<BankService, BankServiceImpl>();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(b => b.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .SetIsOriginAllowed((Host) => true));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
