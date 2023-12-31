using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
.AddFluentValidation(c=> c.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()))
    ;

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//----------

//Cors

builder.Services.AddCors(options => options.AddPolicy("AllowWepapp",
                           builder => builder.AllowAnyOrigin()
                          .AllowAnyHeader().AllowAnyMethod()));

// services
/*
var mySQLConfiguration = new MySQLConfiguration(builder.Configuration.GetConnectionString("SqlConnection"));
builder.Services.AddSingleton(mySQLConfiguration);
*/
// Context
var connectionString = builder.Configuration.GetConnectionString("SqlConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql
    (connectionString, ServerVersion.AutoDetect(connectionString));

});
builder.Services.AddScoped<ICrud<Contact>, ContactRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
//--AUTOMAPPER
builder.Services.AddAutoMapper(typeof(Program));

//-----Builder

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWepapp");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
