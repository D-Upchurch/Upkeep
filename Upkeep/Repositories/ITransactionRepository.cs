using System;
using System.Collections.Generic;
using Upkeep.Models;

namespace Upkeep.Repositories
{
    public interface ITransactionRepository
    {
        void Add(Transaction transaction);
        void Delete(int id);
        List<Transaction> FilterSinceGivenDate(DateTime givenDate);
        Transaction GetTransactionById(int id);
        List<Transaction> GetTransactionsByFirebaseUserId(string firebaseUserId);
        List<Transaction> Search(string criterion);
        void Update(Transaction transaction);
    }
}