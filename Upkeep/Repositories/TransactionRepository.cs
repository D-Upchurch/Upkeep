using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upkeep.Models;
using Upkeep.Utils;

namespace Upkeep.Repositories
{
    public class TransactionRepository : BaseRepository, ITransactionRepository
    {
        public TransactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Transaction> GetTransactionsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.id, t.userId, t.description, t.price, t.date, t.type,
                           u.Id AS UsersId, u.[Name] as UserName, u.email, u.phone, u.firebaseUserId
                    FROM [Transaction] t
                    LEFT JOIN [User] u ON t.userId = u.Id
                    WHERE t.userId = @userId
                    ";
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var transactions = new List<Transaction>();

                    while (reader.Read())
                    {
                        transactions.Add(new Transaction()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Description = DbUtils.GetString(reader, "description"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Date = DbUtils.GetDateTime(reader, "date"),
                            Type = DbUtils.GetBool(reader, "type"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        });
                    }

                    reader.Close();

                    return transactions;
                }
            }
        }

        public Transaction GetTransactionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.id, t.userId, t.description, t.price, t.date, t.type,
                           u.Id AS UsersId, u.[Name] as UserName, u.email, u.phone, u.firebaseUserId
                    FROM [Transaction] t
                    LEFT JOIN [User] u ON t.userId = u.Id
                    WHERE t.id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var transaction = new Transaction();

                    if (reader.Read())
                    {
                        transaction = new Transaction()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Description = DbUtils.GetString(reader, "description"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Date = DbUtils.GetDateTime(reader, "date"),
                            Type = DbUtils.GetBool(reader, "type"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        };
                    }
                    reader.Close();

                    return transaction;
                }
            }
        }

        public void Add(Transaction transaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO [Transaction] (Description, Price, Date, Type, UserId)
                    OUTPUT INSERTED.ID
                    VALUES(@Description, @Price, @Date, @Type, @UserId);
                    ";

                    DbUtils.AddParameter(cmd, "@Description", transaction.Description);
                    DbUtils.AddParameter(cmd, "@Price", transaction.Price);
                    DbUtils.AddParameter(cmd, "@Date", transaction.Date);
                    DbUtils.AddParameter(cmd, "@Type", transaction.Type);
                    DbUtils.AddParameter(cmd, "@UserId", transaction.UserId);

                    transaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Transaction transaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE [Transaction]
                    SET Description = @Description,
                        Price = @Price,
                        Date = @Date,
                        Type = @Type
                    WHERE [Id] = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Description", transaction.Description);
                    DbUtils.AddParameter(cmd, "@Price", transaction.Price);
                    DbUtils.AddParameter(cmd, "@Date", transaction.Date);
                    DbUtils.AddParameter(cmd, "@Type", transaction.Type);
                    DbUtils.AddParameter(cmd, "@Id", transaction.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM [Transaction]
                    WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Transaction> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.id, t.userId, t.description, t.price, t.date, t.type,
                           u.Id AS UsersId, u.[Name] as UserName, u.email, u.phone, u.firebaseUserId
                    FROM [Transaction] t
                    LEFT JOIN [User] u ON t.userId = u.Id
                    WHERE (t.description LIKE @Criterion) OR (t.price LIKE @Criterion)
                    ";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var transactions = new List<Transaction>();

                    while (reader.Read())
                    {
                        transactions.Add(new Transaction()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Description = DbUtils.GetString(reader, "description"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Date = DbUtils.GetDateTime(reader, "date"),
                            Type = DbUtils.GetBool(reader, "type"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        });
                    }

                    reader.Close();

                    return transactions;
                }
            }
        }

        public List<Transaction> FilterSinceGivenDate(DateTime givenDate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.id, t.userId, t.description, t.price, t.date, t.type,
                           u.Id AS UsersId, u.[Name] as UserName, u.email, u.phone, u.firebaseUserId
                    FROM Transaction t
                    LEFT JOIN [User] u ON t.userId = u.Id
                    WHERE t.Date >= @givenDate
                    ";

                    DbUtils.AddParameter(cmd, "@givenDate", givenDate);

                    var reader = cmd.ExecuteReader();

                    var transactions = new List<Transaction>();
                    while (reader.Read())
                    {
                        transactions.Add(new Transaction()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Description = DbUtils.GetString(reader, "description"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Date = DbUtils.GetDateTime(reader, "date"),
                            Type = DbUtils.GetBool(reader, "type"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        });
                    }

                    reader.Close();

                    return transactions;
                }
            }
        }
    }
}
