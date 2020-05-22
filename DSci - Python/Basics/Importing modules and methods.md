https://stackoverflow.com/questions/710551/use-import-module-or-from-module-import

# Should I use 'import module' or 'from module import'?
Either method is acceptable, but don't use from module import *
~~~
The difference between import module and from module import foo is mainly subjective. Pick the one you like best and be consistent in your use of it. Here are some points to help you decide.

import module

Pros:
Less maintenance of your import statements. Don't need to add any additional imports to start using another item from the module
Cons:
Typing module.foo in your code can be tedious and redundant (tedium can be minimized by using import module as mo then typing mo.foo)
from module import foo

Pros:
Less typing to use foo
More control over which items of a module can be accessed
Cons:
To use a new item from the module you have to update your import statement
You lose context about foo. For example, it's less clear what ceil() does compared to math.ceil()
~~~
