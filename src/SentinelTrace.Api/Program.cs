using SentinelTrace.Endpoints;
using SentinelTrace.Api.Extensions;
using SentinelTrace.Api.Services;
using SentinelTrace.Infrastructure;
using SentinelTrace.Infrastructure.Persistence;
using SentinelTrace.Domain.Entities;
using SentinelTrace.Application;
using SentinelTrace.Application.Common.Interfaces;
using MediatR;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Application
builder.Services.AddMediatR(typeof(AssemblyReference).Assembly);

// API Services
builder.Services.AddSingleton<DashboardService>();

// Infrastructure
builder.Services.AddInfrastructure(builder.Configuration);

// fake logs
builder.Services.AddScoped<IApplicationDbContext>(provider =>
    provider.GetRequiredService<ApplicationDbContext>());

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated(); // <-- funciona SEM migrations
}



// Hot reload fix
app.Use(async (context, next) =>
{
    context.Response.Headers["Cache-Control"] = "no-store";
    await next();
});

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS
app.UseCors("AllowFrontend");

// Endpoints
app.MapLogEndpoints();
app.MapEventLogEndpoints();
app.MapErrorLogEndpoints();
app.MapMetricsLogEndpoints();
app.MapDashboardEndpoints();
app.MapHealthEndpoints();

//creating fake logs
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    if (!db.RequestLogs.Any())
    {
        db.RequestLogs.AddRange(new[]
        {
            new RequestLog
            {
                ServiceName = "SentinelTrace.Api",
                Endpoint = "/api/logs",
                Method = "GET",
                StatusCode = 200,
                DurationMs = 120,
                CorrelationId = Guid.NewGuid().ToString(),
                ClientIp = "127.0.0.1",
                TimestampUtc = DateTime.UtcNow.AddMinutes(-10)
            },
            new RequestLog
            {
                ServiceName = "SentinelTrace.Worker",
                Endpoint = "/api/events",
                Method = "POST",
                StatusCode = 201,
                DurationMs = 340,
                CorrelationId = Guid.NewGuid().ToString(),
                ClientIp = "127.0.0.1",
                TimestampUtc = DateTime.UtcNow.AddMinutes(-5)
            },
            new RequestLog
            {
                ServiceName = "SentinelTrace.Database",
                Endpoint = "/api/errors",
                Method = "GET",
                StatusCode = 500,
                DurationMs = 980,
                CorrelationId = Guid.NewGuid().ToString(),
                ClientIp = "127.0.0.1",
                TimestampUtc = DateTime.UtcNow.AddMinutes(-2)
            }
        });

        db.SaveChanges();
    }
}


// Root endpoint
app.MapGet("/", () => "SentinelTrace API running");

app.Run();
