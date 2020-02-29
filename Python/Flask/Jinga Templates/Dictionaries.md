app.py
~~~
# import necessary libraries
from flask import Flask, render_template

# create instance of Flask app
app = Flask(__name__)


# create route that renders index.html template
@app.route("/")
def index():
    player_dictionary = {"player_1": "Jessica",
                         "player_2": "Mark"}
    return render_template("index.html", dict=player_dictionary)


if __name__ == "__main__":
    app.run(debug=True)

~~~

index.html
~~~
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Sports!</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>
  <div class="container text-center">
    <h1 class="jumbotron">Player Roster</h1>
    <div>
      <ul style="list-style: none;">
        <li>{{ dict.player_1 }}</li>
        <li>{{ dict.player_2 }}</li>
      </ul>
    </div>
  </div>
</body>

</html>
~~~
