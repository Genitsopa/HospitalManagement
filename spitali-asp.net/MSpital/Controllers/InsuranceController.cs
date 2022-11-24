using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MSpital.Models;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace HealthInsuranceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public InsuranceController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select 
                            InsuranceId, 
                            CompanyName, 
                            PatientName, 
                            PatientSurname,
                            Birthdate, 
                            CurrentWork, 
                            Expenses from
                            dbo.Insurance
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

        [HttpPost]
        public JsonResult Post(Insurance inc)
        {
            string query = @"
                           insert into dbo.Insurance
                           (CompanyName, PatientName, PatientSurname, Birthdate, CurrentWork, Expenses)
                           values (@CompanyName, @PatientName, @PatientSurname, @Birthdate, @CurrentWork, @Expenses)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CompanyName", inc.CompanyName);
                    myCommand.Parameters.AddWithValue("@PatientName", inc.PatientName);
                    myCommand.Parameters.AddWithValue("@PatientSurname", inc.PatientSurname);
                    myCommand.Parameters.AddWithValue("@Birthdate", inc.Birthdate);
                    myCommand.Parameters.AddWithValue("@CurrentWork", inc.CurrentWork);
                    myCommand.Parameters.AddWithValue("@Expenses", inc.Expenses);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Insurance inc)
        {
            string query = @"
                           update dbo.Insurance
                           set CompanyName= @CompanyName,
                            PatientName=@PatientName,
                            PatientSurname=@PatientSurname,
                            Birthdate=@Birthdate,
                            CurrentWork=@CurrentWork,
                            Expenses=@Expenses
                            where InsuranceId=@InsuranceId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@InsuranceId", inc.InsuranceId);
                    myCommand.Parameters.AddWithValue("@CompanyName", inc.CompanyName);
                    myCommand.Parameters.AddWithValue("@PatientName", inc.PatientName);
                    myCommand.Parameters.AddWithValue("@PatientSurname", inc.PatientSurname);
                    myCommand.Parameters.AddWithValue("@Birthdate", inc.Birthdate);
                    myCommand.Parameters.AddWithValue("@CurrentWork", inc.CurrentWork);
                    myCommand.Parameters.AddWithValue("@Expenses", inc.Expenses);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Insurance
                            where InsuranceId=@InsuranceId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@InsuranceId", id);

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
