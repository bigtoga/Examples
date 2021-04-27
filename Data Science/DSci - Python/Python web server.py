# Run this in the same folder as your html file:
python -m http.server`

# You might be an error if you are attempting to access a local file through javascript. It doesn't like that unless you are using firefox, or running chrome with an http.server

# git Bash has this wierd issue where it doesn't update the output feed some times on windows. You may have to do this:
python -u -m http.server 
