using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinalTestApi.Models;

public partial class AccountBankContext : DbContext
{
    public AccountBankContext()
    {
    }

    public AccountBankContext(DbContextOptions<AccountBankContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<TransactionDetail> TransactionDetails { get; set; }

    /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=NERGIGANTE;Database=AccountBank;user id=sa;password=123456;trusted_connection=true;encrypt=false");*/

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccId);

            entity.ToTable("Account");

            entity.Property(e => e.AccId).HasColumnName("acc_id");
            entity.Property(e => e.Balance).HasColumnName("balance");
            entity.Property(e => e.CustomerName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("customerName");
            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Phone)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<TransactionDetail>(entity =>
        {
            entity.HasKey(e => e.TransId);

            entity.Property(e => e.TransId).HasColumnName("trans_id");
            entity.Property(e => e.AccId).HasColumnName("acc_id");
            entity.Property(e => e.DateOfTrans)
                .HasColumnType("date")
                .HasColumnName("dateOfTrans");
            entity.Property(e => e.TransMoney).HasColumnName("transMoney");
            entity.Property(e => e.TransType).HasColumnName("transType");

            entity.HasOne(d => d.Acc).WithMany(p => p.TransactionDetails)
                .HasForeignKey(d => d.AccId)
                .HasConstraintName("FK_TransactionDetails_Account");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    internal Task FindAsync(int accId)
    {
        throw new NotImplementedException();
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
