<?php

$Mighty = new Mighty();
$json = $Mighty->getJSON('http://autos.aol.com/cars-js/global/get_new_data.jsp');

function object2array($object) {
    if (is_object($object)) {
        foreach ($object as $key => $value) {
            $array[$key] = $value;
        }
    }
    else {
        $array = $object;
    }
    return $array;
}

$json = object2array($json);
ksort(&$json);
?>
<div class="mighty-autos mighty-autos_newcar mighty-reset">
	<h2 class="header">Research <em>A New Car</em></h2>
	<form action="http://autos.aol.com/ymm-overview-redir.jsp" method="post">
		<div>
		<?php
		foreach( $json as $make => $value ):
			echo '<h3>' . $make . '</h3>';
			foreach( $json[$make] as $model ):
				echo '<label><input type="radio" name="make" value="'. $make .'"><span>' . $model . '</span></label>';
			endforeach;
		endforeach;
		?>
		</div>
		<input type="submit" value="GO">
		<input name="location" type="text" placeholder="Zip Code"/>
	</form>
</div>