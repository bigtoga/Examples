[Start with the docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/)

ASP.NET Core using IIS is called the **in-process hosting model**. It is the default. 
- Runs in process with the IIS worker process
- Better performance over out-of-process hosting Kestrel) because requests aren’t proxied over the loopback adapter
- IIS uses exact same [Windows Process Activation Service (WAS) model](https://docs.microsoft.com/en-us/iis/manage/provisioning-and-managing-iis/features-of-the-windows-process-activation-service-was) that it has for 8+ years

# ASP.NET Core Request Lifecycle 

The **ASP.NET Core Module**:
- Performs app initialization
   - Loads the **CoreCLR**
   - Calls `Program.Main`
- Handles the lifetime of the IIS native request

![?](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/index/_static/ancm-inprocess.png?view=aspnetcore-3.1)

1. A request arrives from the web to the kernel-mode `HTTP.sys` driver
2. The driver routes the native request to IIS on the website’s configured port, usually 80 (HTTP) or 443 (HTTPS)
3. The `ASP.NET Core Module` receives the native request and passes it to IIS HTTP Server (`IISHttpServer`). IIS HTTP Server is an in-process server implementation for IIS that **converts the request from native to managed**
1. The request is sent to the `ASP.NET Core middleware pipeline`
1. The middleware pipeline handles the request and passes it on as an `HttpContext` instance to the app’s logic.
1. The app’s response is passed back to IIS through IIS HTTP Server
1. IIS sends the response to the client that initiated the request

# IIS deployment configuration that can be controlled inside of `services.Configure()`
Example C#:
```shell   
services.Configure<IISServerOptions>(options => 
{
    options.AutomaticAuthentication = false;
});
```

# Things to remember 
Although you can publish ASP.NET Core apps as a single executable, those cannot be served using IIS


