Short answer: “Not supported, but... you can use sub applications”

So no vdir option. If you want to use something similar, they want you to:
1. Write a separate ASP.NET Core app
2. Deploy it as a separate website with a separate app pool
3. Convert it to a sub application by selecting `Convert to application `in IIS
4. Go back to your original site and add the sub application as a virtual application 
5. Refer to files from the sub app using **tag helpers** and “tilde-slash notation”:
   - In the main site app that is configured with a sub application at `/subapp_path`, use tilde-slash to pretend any files you want the sub app to render -  **src=“~/image.png”** (note the tilde)
   - This is actually rendered as **src=“/subapp_path/image.png”**
   - The root app’s `Static File` Middleware doesn’t process the static file request. The request instead is processed by the *sub-app’s Static File* Middleware.
