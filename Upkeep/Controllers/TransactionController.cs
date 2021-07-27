using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upkeep.Models;
using Upkeep.Repositories;

namespace Upkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepo;

        public TransactionController(ITransactionRepository transactionRepository)
        {
            _transactionRepo = transactionRepository;
        }

        [HttpGet("details/{id}")]
        public IActionResult Get(int id)
        {
            var transaction = _transactionRepo.GetTransactionById(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpGet("{userId}")]
        public IActionResult GetTransactions(int userId)
        {
            List<Transaction> transactions = _transactionRepo.GetTransactionsByUserId(userId);

            return Ok(transactions);
        }

        [HttpPost]
        public IActionResult Post(Transaction transaction)
        {
            _transactionRepo.Add(transaction);
            return CreatedAtAction("Get", new { id = transaction.Id }, transaction);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _transactionRepo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _transactionRepo.Update(transaction);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string criterion)
        {
            return Ok(_transactionRepo.Search(criterion));
        }

        [HttpGet("filter")]
        public IActionResult FilterSinceGivenDate(DateTime givenDate)
        {
            return Ok(_transactionRepo.FilterSinceGivenDate(givenDate));
        }
    }
}
