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

namespace Bloodgroupp.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodgroupController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public BloodgroupController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select BloodgroupId, NameOfPacient, SurnameOfPacient,
                            convert(varchar(10),Bloodgrooup,120) as Bloodgrooup
                            from
                            dbo.Bloodgrooup
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
        public JsonResult Post(Bloodgroup bg)
        {
            string query = @"
                            insert into dbo.Bloodgrooup
                            (NameOfPacient,SurnameOfPacient,Bloodgrooup)
                            values (@NameOfPacient,@SurnameOfPacient,@Bloodgrooup)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@NameOfPacient", bg.NameOfPacient);
                    myCommand.Parameters.AddWithValue("@SurnameOfPacient", bg.SurnameOfPacient);
                    myCommand.Parameters.AddWithValue("@Bloodgrooup", bg.Bloodgrooup);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        // PUT api/values/5
        [HttpPut]
        public JsonResult Put(Bloodgroup bg)
        {
            string query = @"
                           update dbo.Bloodgrooup
                           set NameOfPacient= @NameOfPacient,
                            SurnameOfPacient= @SurnameOfPacient,
                            Bloodgrooup= @Bloodgrooup
                            where BloodgroupId=@BloodgroupId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@BloodgroupId", bg.BloodgroupId);
                    myCommand.Parameters.AddWithValue("@NameOfPacient", bg.NameOfPacient);
                    myCommand.Parameters.AddWithValue("@SurnameOfPacient", bg.SurnameOfPacient);
                    myCommand.Parameters.AddWithValue("@Bloodgrooup", bg.Bloodgrooup);
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
                            delete from dbo.Bloodgrooup
                            where BloodgroupId=@BloodgroupId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@BloodgroupId", id);
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
