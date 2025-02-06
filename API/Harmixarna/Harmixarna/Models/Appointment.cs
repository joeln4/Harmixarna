namespace Harmixarna.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string? CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime Date { get; set; }
        public string Service { get; set; }
    }
}
