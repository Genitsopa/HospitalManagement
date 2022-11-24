using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MSpital.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Alergjit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllergyController : Controller

    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public AllergyController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        // GET: api/values
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select AllergyId, NameOfAllergy,
                            RiskOfAllergy, CureOfAllergy
                            
                            from
                            dbo.Allergy
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        // POST api/values
        [HttpPost]
        public JsonResult Post(Allergy alle)
        {
            string query = @"
                           insert into dbo.Allergy
                           (NameOfAllergy,RiskOfAllergy,CureOfAllergy)
                    values (@NameOfAllergy,@RiskOfAllergy,@CureOfAllergy)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@NameOfAllergy", alle.NameOfAllergy);
                    myCommand.Parameters.AddWithValue("@RiskOfAllergy", alle.RiskOfAllergy);
                    myCommand.Parameters.AddWithValue("@CureOfAllergy", alle.CureOfAllergy);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        // PUT api/values/5
        public JsonResult Put(Allergy alle)
        {
            string query = @"
                           update dbo.Allergy
                           set NameOfAllergy = @NameOfAllergy,
                           RiskOfAllergy = @RiskOfAllergy,
                           CureOfAllergy = @CureOfAllergy
                           where AllergyId = @AllergyId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AllergyId", alle.AllergyId);
                    myCommand.Parameters.AddWithValue("@NameOfAllergy", alle.NameOfAllergy);
                    myCommand.Parameters.AddWithValue("@RiskOfAllergy", alle.RiskOfAllergy);
                    myCommand.Parameters.AddWithValue("@CureOfAllergy", alle.CureOfAllergy);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Allergy
                            where AllergyId=@AllergyId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AllergyId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


    }
}

