using System;
namespace MSpital.Models
{
    public class AppointmentTypes
    {
        public int AppointmentTypesId { get; set; }

        public string AppointmentType { get; set; }

        public string UsualAppointmentLength { get; set; }

        public string OnlineBookingAvailable { get; set; }
    }
}
