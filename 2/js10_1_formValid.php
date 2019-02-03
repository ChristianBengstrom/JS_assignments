<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Client form validation</title>
    <script src="js10_1_formValid.js" charset="utf-8"></script>
    <script src='nQuery.js'></script>
  </head>
  <body>
    <h1>Client form validation</h1>

    <form class="" action="http://x15.dk/hitme.php" method="post">
      <label> date: </label>
      <input
        type="date"
        name="date"
        required
        spellcheck="false"
        placeholder="dd-mm-yy"
      >
      <br><br>
      <label> Kelvin: </label>
      <input
        type="range"
        name="slider"
        id="slider"
        required
        maxlength="4"
        size="5"
        spellcheck="false"
        min="-279"
        max="6000"
        value="0"
      > <label id="output">0</label>
      <br><br>
      <label> number: </label>
      <input
        type="number"
        name="num"
        required
        maxlength="3"
        spellcheck="false"
        placeholder="0-100"
        min="0"
        max="100"
      >
      <br><br>

      <button type="submit" name="go">Go</button>
    </form>

  </body>
</html>
