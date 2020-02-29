Your HTML uses bracket-bracket value substitution:
~~~
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Templates 101</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>
  <div class="container">

    <div class="jumbotron text-center">
      <!-- Render our data -->
      <h1>{{ text }}</h1>
    </div>

  </div>
</body>

</html>
~~~

Your Flask app.py uses **render_template** to open the index.html and perform the substitution:
~~~
# import necessary libraries
from flask import Flask, render_template

# create instance of Flask app
app = Flask(__name__)


# create route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html", text="Serving up cool text from the Flask server!!")

if __name__ == "__main__":
    app.run(debug=True)
~~~~
