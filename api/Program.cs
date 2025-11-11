using api.Data;
using api.Interfaces;
using api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<Program>();
var sendGridApiKey = builder.Configuration["SendGrid:ApiKey"];
var sendGridTemplateId = builder.Configuration["SendGrid:TemplateId"];
var sendGridFromEmail = builder.Configuration["SendGrid:FromEmail"];

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<EmailService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("DevFrontend");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

