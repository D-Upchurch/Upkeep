using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly IUserRepository _userRepository;

        public TransactionController(ITransactionRepository transactionRepository, IUserRepository userRepository)
        {
            _transactionRepo = transactionRepository;
            _userRepository = userRepository;
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

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetTransactions(string firebaseUserId)
        {
            List<Transaction> transactions = _transactionRepo.GetTransactionsByFirebaseUserId(firebaseUserId);

            return Ok(transactions);
        }

        [HttpPost]
        public IActionResult Post(Transaction transaction)
        {
            var currentUserProfile = GetCurrentUserProfile();
            transaction.UserId = currentUserProfile.Id;
            transaction.User = currentUserProfile;
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
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_transactionRepo.Search(criterion, currentUserProfile.FirebaseUserId));
        }

        [HttpGet("filter")]
        public IActionResult FilterSinceGivenDate(DateTime givenDate)
        {
            return Ok(_transactionRepo.FilterSinceGivenDate(givenDate));
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
