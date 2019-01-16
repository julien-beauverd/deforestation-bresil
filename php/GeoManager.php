<?php
class Connection {

    private $CONFIG;
    private $CONN;

    function __construct($cfg) {
        $this->CONFIG = $cfg;
        return $this->CONN = pg_connect($this->CONFIG) or die('connection failed');
    }

    function selectQuery($query) {
        $result = pg_query($this->CONN, $query);
        if (!$result) throw new ErrorException($query);
        return $result;
    }

    function insertQuery($query) {
        pg_query($this->CONN, "BEGIN WORK");
        $result = pg_query($this->CONN, $query);
        if (!$result) {
            pg_query($this->CONN, "ROLLBACK");
        } else {
            pg_query($this->CONN, "COMMIT");
        }
    }
}

class Feature
{
  var $type;
  var $geometry;
  var $id;
  var $properties;

  function Feature($id,$geom,$properties) {
    $this->type = "Feature";
    $this->geometry = $geom;
    $this->id = $id;
    $this->properties = $properties;
             
  }
}

class FeatureCollection
{
  var $type;
  var $features;
  
  function FeatureCollection()
  {
    $this->type = "FeatureCollection";
    $this->features = array();
  }
  
  function addFeature($feature) {
    array_push($this->features,$feature);
  } 
}
?>