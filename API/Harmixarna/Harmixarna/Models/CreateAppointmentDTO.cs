namespace Harmixarna.Models
{
    public class CreateAppointmentDTO
    {
        public string CustomerName { get; set; }
        public string? CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime Date { get; set; }
        public string Service { get; set; }
    }
}
