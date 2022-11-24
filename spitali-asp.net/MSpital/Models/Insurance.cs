using System;
namespace MSpital.Models
{
    public class Insurance
    {
        public int InsuranceId { get; set; }
        public string CompanyName { get; set; }
        public string PatientName { get; set; }
        public string PatientSurname { get; set; }
        public string Birthdate { get; set; }
        public string CurrentWork { get; set; }
        public string Expenses { get; set; }


    }
}