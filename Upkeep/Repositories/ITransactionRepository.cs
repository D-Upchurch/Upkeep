using System;
using System.Collections.Generic;
using Upkeep.Models;

namespace Upkeep.Repositories
{
    public interface ITransactionRepository
    {
        void Add(Transaction transaction);
        void Delete(int id);
        List<Transaction> FilterDateWeek(string firebaseUserId);
        List<Transaction> FilterDateMonth(string firebaseUserId);
        Transaction GetTransactionById(int id);
        List<Transaction> GetTransactionsByFirebaseUserId(string firebaseUserId);
        List<Transaction> Search(string criterion, string firebaseUserId);
        void Update(Transaction transaction);
    }
}