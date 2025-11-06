using Microsoft.AspNetCore.Mvc.RazorPages;
using NavEd.Models;

public class IndexModel : PageModel
{
    public List<EventItem> Events { get; set; }

    public void OnGet()
    {
        Events = new List<EventItem>
        {
            new EventItem { Title = "Math Lecture", Time = DateTime.Today.AddHours(9), Location = "Room 101" },
            new EventItem { Title = "Physics Lab", Time = DateTime.Today.AddHours(11), Location = "Lab 2" },
            new EventItem { Title = "Staff Meeting", Time = DateTime.Today.AddHours(14), Location = "Conference Room" }
        };
    }
}
