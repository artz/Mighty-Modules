<?php

$Mighty = new Mighty();
$json = $Mighty->getJSON('http://autos.aol.com/cars-js/global/get_new_data.jsp');

?>
<div class="mighty-autos mighty-autos_newcar mighty-reset">
	<h2>Research <em>A New Car</em></h2>
	<form action="http://autos.aol.com/ymm-overview-redir.jsp" method="post">
		<div>
		<?php
		foreach( $json as $make => $value ):
			echo '<h3>' . $make . '</h3>';
			foreach( $json->$make as $model ):
				echo '<label><input type="radio" name="make" value="'. $make .'"> ' . $model . '</label>';
			endforeach;
		endforeach;
		?>
		</div>
		<input type="submit" value="GO">
		<input name="location" type="text" placeholder="Zip Code"/>
	</form>
</div>