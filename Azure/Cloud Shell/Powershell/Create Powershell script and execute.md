# Change to the "clouddrive" folder first, then make your script
~~~
cd $HOME\clouddrive

# Create a new file in clouddrive directory
New-Item helloworld.ps1

# Open the new file for editing
code .\helloworld.ps1

# Add the content, such as 'Hello World!'
.\helloworld.ps1

>>> Hello World!
~~~

# To create a script file for use whenever you log into Cloud Shell
1. Launch Cloud Shell and choose Powershell
2. Launch the editor (the two curly braces)
3. Write your script, save, and close the editor
4. In Cloud Shell, execute "ls" - you will see your file. It's unusable as is though - you cannot execute it yet
5. cd $HOME
6. ".\Myfile.ps1"

That's it - you have to cd to $HOME to execute. 
