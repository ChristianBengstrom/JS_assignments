<?php
require_once './DbP.inc.php';
require_once './DbH.inc.php';
$dbh = DbH::getDbH();

$sql = "select id, name, population";
$sql .= " from cities";
$sql .= " where countrycode = 'DNK';";
$a = array();
try {
    $res = $dbh->query($sql);

    foreach ($res as $out) {
        array_push($a, $out);
    }
} catch (PDOException $e) {
    printf("<p>Select error: <br/>%s</p>\n",
      $e->getMessage());
}

$xmit = json_encode($a);
header('Content-Type: application/json');
print($xmit);
