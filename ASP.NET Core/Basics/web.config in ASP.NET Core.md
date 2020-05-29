Only used by IIS

See the first three sections of the [ASP.NET Core Model](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/aspnet-core-module) documentation you see more

> The **ASP.NET Core Module** is a native IIS module that plugs into the IIS pipeline to either:
- Host an ASP.NET Core app inside of the IIS worker process (w3wp.exe), called the **in-process hosting model** (the default)
- Forward web requests to a backend ASP.NET Core app running the Kestrel server, called the **out-of-process hosting model**

# In-Process Hosting Model 
By default, ASP.NET Core apps use `IIS HTTP Server (IISHttpServer)` on IIS or IIS Express (if running locally)

## Important to remember about in-process:
- Use one app pool per app. Sharing an app pool among apps isn’t supported
- Open connections will delay/prevent deployments even when using `app_offline.htm` - the app will wait to complete current requests before shutting down. **This includes Web Deploy** 
- The requestTimeout attribute doesn’t apply to in-process hosting
* Changes to `web.config` “hostingModel” will cause IIS to restart the app pool, but IIS Express will gracefully shut down the app pool’s thread and start a new threadUpon the next request 

# Out-of-process Hosting Model
Only works with Kestrel; does not work with HTTP.SYS or IIS

# Process names
`Process.GetCurrentProcess().ProcessName` reports `w3wp/iisexpress` (in-process) or `dotnet` (out-of-process).



