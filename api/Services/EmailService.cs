using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using SendGrid;
using SendGrid.Helpers.Mail;
//Template ID: d-198c8558ff334d988e96f7e8988f3689
//Api key: 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
namespace api.Services
{
    public class EmailService
    {
        private readonly ApplicationDbContext _context;
        public EmailService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task SendEmailConfirmationAsync(int id)
        {
            var booking = await _context.Bookings.Include(b => b.Treatments).Include(b => b.Customer).FirstOrDefaultAsync(b => b.Id == id) ?? throw new("Kunde inte hitta bokningen.");

            var customerEmail = booking.Customer.Email;
            var customerName = booking.Customer.Name;

            var formattedDate = booking.StartTime.ToString("dddd, dd MMMM yyyy 'kl.' HH:mm", new CultureInfo("sv-SE"));
            var formattedPrice = booking.Price.ToString() + " kr";
            var formattedTreatments = String.Join(", ", booking.Treatments.Select(t => t.Type).ToList());

            var bookingData = new
            {
                bookingId = booking.Id,
                date = formattedDate,
                treatments = formattedTreatments,
                message = booking.Message,
                price = formattedPrice,
                name = booking.Customer.Name,
                email = booking.Customer.Email,
                phone = booking.Customer.Phone
            };

            var apiKey = "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";
            var templateId = "d-198c8558ff334d988e96f7e8988f3689";

            var client = new SendGridClient(apiKey);
            var from_email = new EmailAddress("joel.norling@hotmail.com", "Hårmixarna");
            var to_email = new EmailAddress("norlingjoel4@gmail.com", customerName);

            var msg = new SendGridMessage
            {
                From = from_email,
                TemplateId = templateId
            };
            msg.AddTo(to_email);
            msg.SetTemplateData(bookingData);

            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }
    }
}