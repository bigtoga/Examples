~~~

from collections import namedtuple
Friend = namedtuple('Friend' , 'birthday food color introvert')
Kate = Friend('Feb', 'cake', 'pink', True)
Ben = Friend('Jan', 'fish', 'red', False)

Friend(birthday='Feb', food='cake', color='pink', introvert=True)
>>> Kate

Ben.introvert
>>> True

~~~
