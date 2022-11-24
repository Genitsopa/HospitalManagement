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

namespace Infermieri.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfermierController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public InfermierController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select InfermierId, InfermierName, Surname, Gender, Age, 
                            convert(varchar(10),DoktorName,120) as DoktorName
                            from
                            dbo.Infermier
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
        public JsonResult Post(Infermier inf)
        {
            string query = @"
                            insert into dbo.Infermier
                            (InfermierName,Surname,Gender,Age,DoktorName)
                            values (@InfermierName,@Surname,@Gender,@Age,@DoktorName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@InfermierName", inf.InfermierName);
                    myCommand.Parameters.AddWithValue("@Surname", inf.Surname);
                    myCommand.Parameters.AddWithValue("@Gender", inf.Gender);
                    myCommand.Parameters.AddWithValue("@Age", inf.Age);
                    myCommand.Parameters.AddWithValue("@DoktorName", inf.DoktorName);
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
        public JsonResult Put(Infermier inf)
        {
            string query = @"
                            update dbo.Infermier
                            set InfermierName = @InfermierName,
                            Surname = @Surname,
                            Gender = @Gender,
                            Age = @Age,
                            DoktorName = @DoktorName
                            where InfermierId = @InfermierId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@InfermierId", inf.InfermierId);
                    myCommand.Parameters.AddWithValue("@InfermierName", inf.InfermierName);
                    myCommand.Parameters.AddWithValue("@Surname", inf.Surname);
                    myCommand.Parameters.AddWithValue("@Gender", inf.Gender);
                    myCommand.Parameters.AddWithValue("@Age", inf.Age);
                    myCommand.Parameters.AddWithValue("@DoktorName", inf.DoktorName);
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
                            delete from dbo.Infermier
                            where InfermierId=@InfermierId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@InfermierId", id);
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
